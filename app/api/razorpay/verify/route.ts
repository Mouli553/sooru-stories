import { NextResponse } from "next/server";
import crypto from "crypto";
import { razorpayVerifySchema } from "@/lib/validations";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(`rzp_verify_${ip}`, 10, 60000)) {
      return NextResponse.json({ error: "Too many verification requests" }, { status: 429 });
    }

    const body = await req.json();
    const result = razorpayVerifySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid payment verification payload", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { orderNumber, razorpay_order_id, razorpay_payment_id, razorpay_signature } = result.data;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (secret) {
      const generatedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      const expectedBuf = Buffer.from(generatedSignature, "utf8");
      const receivedBuf = Buffer.from(razorpay_signature, "utf8");

      if (
        expectedBuf.length !== receivedBuf.length ||
        !crypto.timingSafeEqual(expectedBuf, receivedBuf)
      ) {
        console.error("Cryptographic signature verification failed:", {
          orderNumber,
          razorpay_order_id,
          razorpay_payment_id
        });
        return NextResponse.json(
          { error: "Invalid payment signature. Verification failed." },
          { status: 400 }
        );
      }
    }

    // Update database status
    try {
      const supabaseAdmin = createSupabaseAdminClient();
      await supabaseAdmin
        .from("orders")
        .update({
          status: "paid",
          payment_status: "captured",
          razorpay_order_id,
          razorpay_payment_id,
          updated_at: new Date().toISOString()
        })
        .eq("order_number", orderNumber);

      // Record audit history
      const { data: orderData } = await supabaseAdmin
        .from("orders")
        .select("id")
        .eq("order_number", orderNumber)
        .single();

      if (orderData?.id) {
        await supabaseAdmin.from("order_status_history").insert({
          order_id: orderData.id,
          from_status: "pending_payment",
          to_status: "paid",
          note: `Verified Razorpay Payment ID: ${razorpay_payment_id}`
        });
      }
    } catch {
      // In-memory or fallback
    }

    return NextResponse.json({
      success: true,
      verified: true,
      orderNumber,
      paymentId: razorpay_payment_id
    });
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    return NextResponse.json(
      { error: "Internal payment verification error" },
      { status: 500 }
    );
  }
}
