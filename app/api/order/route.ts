import { NextResponse } from "next/server";
import crypto from "crypto";
import { createOrderSchema } from "@/lib/validations";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { menuItems } from "@/lib/menu";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendOrderConfirmationEmail } from "@/lib/email";

// Fallback in-memory order store for local dev when Supabase env keys are not yet connected
const inMemoryOrders: Record<string, unknown>[] = [];

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(`order_${ip}`, 12, 60000)) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down and try again shortly." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = createOrderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid order payload", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Anti-spam honeypot detection
    if (data.b_website && data.b_website.trim().length > 0) {
      console.warn("Bot submission dropped silently via honeypot:", ip);
      return NextResponse.json({ success: true, orderNumber: "SS-BOT-BLOCKED" });
    }

    // 1. TAMPER-PROOF SERVER-SIDE PRICE RECALCULATION
    let subtotalPaise = 0;
    const verifiedOrderItems: Array<{
      productId: string;
      name: string;
      unitPricePaise: number;
      quantity: number;
      lineTotalPaise: number;
    }> = [];

    for (const item of data.items) {
      const catalogDish = menuItems.find((m) => m.id === item.productId);
      if (!catalogDish) {
        return NextResponse.json(
          { error: `Item with ID '${item.productId}' is not in the active catalog.` },
          { status: 400 }
        );
      }
      if (!catalogDish.available) {
        return NextResponse.json(
          { error: `'${catalogDish.name}' is currently unavailable.` },
          { status: 400 }
        );
      }

      const qty = Math.max(1, Math.min(25, item.quantity));
      const lineTotal = catalogDish.pricePaise * qty;
      subtotalPaise += lineTotal;

      verifiedOrderItems.push({
        productId: catalogDish.id,
        name: catalogDish.name,
        unitPricePaise: catalogDish.pricePaise,
        quantity: qty,
        lineTotalPaise: lineTotal
      });
    }

    // 2. DISCOUNT / COUPON CALCULATION
    let discountPaise = 0;
    if (data.couponCode) {
      const code = data.couponCode.toUpperCase().trim();
      if (code === "SOORU50" && subtotalPaise >= 30000) {
        discountPaise = 5000; // ₹50 off
      } else if (code === "FEAST10" && subtotalPaise >= 50000) {
        discountPaise = Math.round(subtotalPaise * 0.1); // 10% off
      }
    }

    // 3. FULFILMENT FEE
    // Free delivery on orders ₹500 (50000 paise) and above
    const fulfilmentFeePaise =
      data.fulfilmentMode === "delivery" && subtotalPaise < 50000 ? 4000 : 0;

    const totalPaise = Math.max(0, subtotalPaise - discountPaise + fulfilmentFeePaise);

    // 4. PAYMENT SIGNATURE VERIFICATION (IF PAID VIA RAZORPAY)
    let orderStatus = "pending_payment";
    let paymentStatus = "pending";

    if (data.razorpay_payment_id && data.razorpay_order_id && data.razorpay_signature) {
      const secret = process.env.RAZORPAY_KEY_SECRET;
      if (secret) {
        const generatedSignature = crypto
          .createHmac("sha256", secret)
          .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
          .digest("hex");

        const expectedBuf = Buffer.from(generatedSignature, "utf8");
        const receivedBuf = Buffer.from(data.razorpay_signature, "utf8");

        if (
          expectedBuf.length !== receivedBuf.length ||
          !crypto.timingSafeEqual(expectedBuf, receivedBuf)
        ) {
          console.error("Razorpay HMAC signature verification failed", {
            orderId: data.razorpay_order_id,
            paymentId: data.razorpay_payment_id
          });
          return NextResponse.json(
            { error: "Cryptographic payment signature mismatch" },
            { status: 400 }
          );
        }
      }
      orderStatus = "paid";
      paymentStatus = "captured";
    } else if (data.paymentMode === "cod") {
      orderStatus = "processing";
      paymentStatus = "pending";
    }

    // 5. GENERATE ORDER NUMBER & RECORD
    const orderNumber = `SS-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const idempotencyKey = data.idempotencyKey || `idem_${orderNumber}_${Date.now()}`;

    const orderRecord = {
      order_number: orderNumber,
      customer_name: data.customerName,
      customer_email: data.customerEmail || "",
      customer_phone: data.customerPhone,
      fulfilment_mode: data.fulfilmentMode,
      delivery_address: data.deliveryAddress || null,
      status: orderStatus,
      payment_status: paymentStatus,
      currency: "INR",
      subtotal_paise: subtotalPaise,
      discount_paise: discountPaise,
      tax_paise: 0,
      fulfilment_fee_paise: fulfilmentFeePaise,
      total_paise: totalPaise,
      razorpay_order_id: data.razorpay_order_id || null,
      razorpay_payment_id: data.razorpay_payment_id || null,
      attribution: data.attribution || {},
      idempotency_key: idempotencyKey,
      items: verifiedOrderItems,
      created_at: new Date().toISOString()
    };

    // 6. PERSISTENCE IN SUPABASE (OR IN-MEMORY RESILIENT FALLBACK)
    try {
      const supabaseAdmin = createSupabaseAdminClient();
      const { data: dbOrder, error: orderErr } = await supabaseAdmin
        .from("orders")
        .insert({
          order_number: orderNumber,
          customer_name: data.customerName,
          customer_email: data.customerEmail || "guest@sooru-stories.in",
          customer_phone: data.customerPhone,
          fulfilment_mode: data.fulfilmentMode,
          delivery_address: data.deliveryAddress,
          status: orderStatus,
          payment_status: paymentStatus,
          currency: "INR",
          subtotal_paise: subtotalPaise,
          discount_paise: discountPaise,
          tax_paise: 0,
          fulfilment_fee_paise: fulfilmentFeePaise,
          total_paise: totalPaise,
          razorpay_order_id: data.razorpay_order_id,
          razorpay_payment_id: data.razorpay_payment_id,
          attribution: data.attribution || {},
          idempotency_key: idempotencyKey
        })
        .select()
        .single();

      if (!orderErr && dbOrder) {
        // Insert order items
        const itemRows = verifiedOrderItems.map((item) => ({
          order_id: dbOrder.id,
          name_snapshot: item.name,
          unit_price_paise: item.unitPricePaise,
          quantity: item.quantity,
          line_total_paise: item.lineTotalPaise
        }));
        await supabaseAdmin.from("order_items").insert(itemRows);

        // Record initial status history
        await supabaseAdmin.from("order_status_history").insert({
          order_id: dbOrder.id,
          from_status: null,
          to_status: orderStatus,
          note: `Order initiated with payment mode: ${data.paymentMode}`
        });
      }
    } catch {
      // In-memory fallback if Supabase credentials are placeholder in current env
      inMemoryOrders.unshift(orderRecord);
    }

    // 7. TRANSACTIONAL EMAIL CONFIRMATION
    if (data.customerEmail && data.customerEmail.includes("@")) {
      sendOrderConfirmationEmail({
        orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        fulfilmentMode: data.fulfilmentMode,
        items: verifiedOrderItems.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          pricePaise: i.unitPricePaise
        })),
        subtotalPaise,
        fulfilmentFeePaise,
        totalPaise,
        paymentMode: data.paymentMode,
        deliveryAddress: data.deliveryAddress
      }).catch((e) => console.error("Non-blocking email sending error:", e));
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      status: orderStatus,
      paymentStatus,
      subtotalPaise,
      discountPaise,
      fulfilmentFeePaise,
      totalPaise,
      currency: "INR",
      items: verifiedOrderItems
    });
  } catch (error) {
    console.error("Critical Order Creation Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your order." },
      { status: 500 }
    );
  }
}
