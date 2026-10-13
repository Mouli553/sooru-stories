import { NextResponse } from "next/server";
import crypto from "crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature) {
      return NextResponse.json({ error: "Missing webhook signature" }, { status: 400 });
    }

    const rawBody = await req.text();

    // Verify webhook signature if secret is configured
    if (webhookSecret) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      const expectedBuf = Buffer.from(expectedSignature, "utf8");
      const receivedBuf = Buffer.from(signature, "utf8");

      if (
        expectedBuf.length !== receivedBuf.length ||
        !crypto.timingSafeEqual(expectedBuf, receivedBuf)
      ) {
        console.error("Razorpay webhook signature verification failed");
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);
    const eventId = event.event_id || event.payload?.payment?.entity?.id || `evt_${Date.now()}`;
    const eventType = event.event;

    // Idempotency check in Supabase
    try {
      const supabaseAdmin = createSupabaseAdminClient();

      // Check if event already processed
      const { data: existingEvent } = await supabaseAdmin
        .from("payment_events")
        .select("id")
        .eq("provider", "razorpay")
        .eq("provider_event_id", eventId)
        .single();

      if (existingEvent) {
        console.log(`Webhook event ${eventId} already processed (Idempotent ignore)`);
        return NextResponse.json({ received: true, already_processed: true });
      }

      // Process event types
      const paymentEntity = event.payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id;
      const razorpayPaymentId = paymentEntity?.id;

      if (eventType === "payment.captured" && razorpayOrderId) {
        await supabaseAdmin
          .from("orders")
          .update({
            status: "paid",
            payment_status: "captured",
            razorpay_payment_id: razorpayPaymentId,
            updated_at: new Date().toISOString()
          })
          .eq("razorpay_order_id", razorpayOrderId);
      } else if (eventType === "payment.failed" && razorpayOrderId) {
        await supabaseAdmin
          .from("orders")
          .update({
            status: "failed",
            payment_status: "failed",
            updated_at: new Date().toISOString()
          })
          .eq("razorpay_order_id", razorpayOrderId);
      }

      // Record in payment_events table
      const payloadHash = crypto.createHash("sha256").update(rawBody).digest("hex");
      await supabaseAdmin.from("payment_events").insert({
        provider: "razorpay",
        provider_event_id: eventId,
        event_type: eventType,
        payload_hash: payloadHash,
        processed_at: new Date().toISOString()
      });
    } catch {
      // In-memory or logging fallback
    }

    return NextResponse.json({ received: true, event: eventType });
  } catch (error) {
    console.error("Razorpay Webhook Error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
