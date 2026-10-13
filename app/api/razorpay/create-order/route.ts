import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { menuItems } from "@/lib/menu";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(`rzp_create_${ip}`, 15, 60000)) {
      return NextResponse.json({ error: "Too many payment requests" }, { status: 429 });
    }

    const body = await req.json();
    const { items, fulfilmentMode, couponCode } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart cannot be empty" }, { status: 400 });
    }

    // 1. TAMPER-PROOF SERVER PRICE RECALCULATION
    let subtotalPaise = 0;
    for (const line of items) {
      const dish = menuItems.find((m) => m.id === line.productId);
      if (!dish || !dish.available) {
        return NextResponse.json(
          { error: `Item '${line.productId}' is not available.` },
          { status: 400 }
        );
      }
      const qty = Math.max(1, Math.min(25, Number(line.quantity) || 1));
      subtotalPaise += dish.pricePaise * qty;
    }

    let discountPaise = 0;
    if (couponCode) {
      const code = String(couponCode).toUpperCase().trim();
      if (code === "SOORU50" && subtotalPaise >= 30000) discountPaise = 5000;
      if (code === "FEAST10" && subtotalPaise >= 50000) discountPaise = Math.round(subtotalPaise * 0.1);
    }

    const fulfilmentFeePaise = fulfilmentMode === "delivery" && subtotalPaise < 50000 ? 4000 : 0;
    const finalTotalPaise = Math.max(100, subtotalPaise - discountPaise + fulfilmentFeePaise);

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
      });

      const order = await razorpay.orders.create({
        amount: finalTotalPaise,
        currency: "INR",
        receipt: `rcpt_${Date.now().toString().slice(-8)}`,
        notes: {
          brand: "Sooru & Stories",
          platform: "E-Commerce Web"
        }
      });

      return NextResponse.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keyId,
        subtotalPaise,
        fulfilmentFeePaise,
        totalPaise: finalTotalPaise
      });
    }

    // Safe simulated sandbox order for local development without live gateway keys
    const testOrderId = `order_test_${Date.now()}`;
    return NextResponse.json({
      id: testOrderId,
      amount: finalTotalPaise,
      currency: "INR",
      keyId: "rzp_test_placeholder",
      subtotalPaise,
      fulfilmentFeePaise,
      totalPaise: finalTotalPaise,
      simulated: true
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment with gateway" },
      { status: 500 }
    );
  }
}
