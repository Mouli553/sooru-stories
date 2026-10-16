import { Resend } from "resend";
import { formatINR } from "./menu";

// Initialize Resend safely
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const emailFrom = process.env.EMAIL_FROM || "orders@sooru-stories.vercel.app";

export interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfilmentMode: string;
  items: Array<{ name: string; quantity: number; pricePaise: number }>;
  subtotalPaise: number;
  fulfilmentFeePaise: number;
  totalPaise: number;
  paymentMode: string;
  deliveryAddress?: {
    line1: string;
    line2?: string | null;
    landmark?: string | null;
    city: string;
    state: string;
    pincode: string;
  } | null;
}

export async function sendOrderConfirmationEmail(order: OrderEmailData): Promise<{ success: boolean; messageId?: string; simulated?: boolean }> {
  if (!order.customerEmail || !order.customerEmail.includes("@")) {
    return { success: false };
  }

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #234331; color: #FAF6EE;">
          <strong>${item.name}</strong> × ${item.quantity}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #234331; text-align: right; color: #D4AF37; font-weight: bold;">
          ${formatINR(item.pricePaise * item.quantity)}
        </td>
      </tr>
    `
    )
    .join("");

  const addressText = order.deliveryAddress
    ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city} - ${order.deliveryAddress.pincode}`
    : "Self-Pickup / Kitchen Counter";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Sooru & Stories - Order Confirmation #${order.orderNumber}</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #061A11; color: #FAF6EE; margin: 0; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #0C2E1D; border: 1px solid #D4AF37; border-radius: 12px; overflow: hidden; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #FAF6EE; margin: 0; font-size: 28px; font-style: italic;">
            Sooru <span style="color: #D4AF37;">&amp;</span> Stories
          </h1>
          <p style="color: #F3D478; margin: 4px 0 0; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">
            Order Confirmation #${order.orderNumber}
          </p>
        </div>

        <p style="font-size: 16px; color: #FAF6EE;">
          Vanakkam <strong>${order.customerName}</strong>,
        </p>
        <p style="color: #D5C9B3; line-height: 1.6;">
          Your feast order has been confirmed by our kitchen! Our chefs are preparing your dishes fresh with stone-ground masalas and pure country ghee.
        </p>

        <div style="background-color: rgba(4, 18, 11, 0.7); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 8px; padding: 20px; margin: 24px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; color: #F3D478; font-size: 12px; text-transform: uppercase; padding-bottom: 10px;">Dish</th>
                <th style="text-align: right; color: #F3D478; font-size: 12px; text-transform: uppercase; padding-bottom: 10px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td style="padding: 12px 0 4px; color: #D5C9B3;">Subtotal</td>
                <td style="padding: 12px 0 4px; text-align: right; color: #FAF6EE;">${formatINR(order.subtotalPaise)}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #D5C9B3;">Delivery Fee</td>
                <td style="padding: 4px 0; text-align: right; color: #FAF6EE;">${order.fulfilmentFeePaise === 0 ? "FREE" : formatINR(order.fulfilmentFeePaise)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0 0; font-size: 18px; font-weight: bold; color: #FAF6EE; border-top: 1px solid #D4AF37;">Total Amount</td>
                <td style="padding: 12px 0 0; font-size: 20px; font-weight: bold; text-align: right; color: #D4AF37; border-top: 1px solid #D4AF37;">${formatINR(order.totalPaise)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div style="margin: 20px 0; font-size: 13.5px; color: #D5C9B3; line-height: 1.6;">
          <p style="margin: 4px 0;"><strong>🛵 Fulfilment:</strong> ${order.fulfilmentMode === "delivery" ? "Doorstep Delivery" : "Kitchen Takeaway"}</p>
          <p style="margin: 4px 0;"><strong>📍 Address:</strong> ${addressText}</p>
          <p style="margin: 4px 0;"><strong>💳 Payment:</strong> ${order.paymentMode.toUpperCase()}</p>
        </div>

        <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(212, 175, 55, 0.2); font-size: 12px; color: #8F8778;">
          <p>Need to modify your order? Message our WhatsApp dispatch directly at <strong>+91 93846 38754</strong></p>
          <p>© ${new Date().getFullYear()} Sooru &amp; Stories. Sathyamangalam &amp; Coimbatore, Tamil Nadu.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Also notify restaurant admin via EmailJS silently
  try {
    const serviceId = process.env.EMAILJS_SERVICE_ID || "service_1tnij0f";
    const templateId = process.env.EMAILJS_TEMPLATE_ID || "template_pnixwxg";
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || "HsrT1U-D1Liv5ehyI";
    const adminEmail = process.env.RESERVATION_EMAIL || process.env.SUPPORT_EMAIL || "moulir607@gmail.com";

    const itemsSummary = order.items.map((i) => `${i.name} × ${i.quantity} (${formatINR(i.pricePaise * i.quantity)})`).join("\n• ");

    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": process.env.NEXT_PUBLIC_SITE_URL || "https://sooru-stories.vercel.app"
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: adminEmail,
          to_name: "Mouli / Sooru & Stories Host",
          from_name: "Sooru & Stories Kitchen",
          reply_to: order.customerEmail,
          name: order.customerName,
          customer_name: order.customerName,
          email: order.customerEmail,
          customer_email: order.customerEmail,
          phone: order.customerPhone,
          customer_phone: order.customerPhone,
          date: new Date().toLocaleDateString("en-IN"),
          time: new Date().toLocaleTimeString("en-IN"),
          guests: `${order.items.length} items (${order.fulfilmentMode})`,
          occasion: `New Order (${order.paymentMode.toUpperCase()})`,
          notes: `Delivery Address: ${addressText}`,
          booking_id: order.orderNumber,
          order_items: order.items.map((i) => `${i.name} × ${i.quantity}`).join(", "),
          message: `Vanakkam!\n\nA new online order #${order.orderNumber} has been received:\n\n• Customer: ${order.customerName}\n• Phone: ${order.customerPhone}\n• Email: ${order.customerEmail}\n• Mode: ${order.fulfilmentMode === "delivery" ? "Doorstep Delivery" : "Takeaway"}\n• Address: ${addressText}\n• Total: ${formatINR(order.totalPaise)}\n• Payment: ${order.paymentMode.toUpperCase()}\n\nItems Ordered:\n• ${itemsSummary}`
        }
      })
    });
  } catch (emailErr) {
    console.warn("Order EmailJS dispatch error:", emailErr);
  }

  if (!resend) {
    console.log(`[SIMULATED EMAIL] Order Confirmation for #${order.orderNumber} to ${order.customerEmail}`);
    return { success: true, simulated: true };
  }

  try {
    const data = await resend.emails.send({
      from: emailFrom,
      to: order.customerEmail,
      subject: `Order Confirmed: #${order.orderNumber} — Sooru & Stories`,
      html
    });
    return { success: true, messageId: data.data?.id };
  } catch (error) {
    console.error("Resend Email Sending Error:", error);
    return { success: false };
  }
}

export interface ReservationEmailData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes?: string;
}

export async function sendReservationEmail(resData: ReservationEmailData): Promise<{ success: boolean; simulated?: boolean }> {
  const serviceId = process.env.EMAILJS_SERVICE_ID || "service_1tnij0f";
  const templateId = process.env.EMAILJS_TEMPLATE_ID || "template_pnixwxg";
  const publicKey = process.env.EMAILJS_PUBLIC_KEY || "HsrT1U-D1Liv5ehyI";
  const adminEmail = process.env.RESERVATION_EMAIL || process.env.SUPPORT_EMAIL || "moulir607@gmail.com";

  let emailjsSuccess = false;

  // 1. Silent EmailJS Dispatch
  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": process.env.NEXT_PUBLIC_SITE_URL || "https://sooru-stories.vercel.app"
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: adminEmail,
          to_name: "Mouli / Sooru & Stories Host",
          from_name: "Sooru & Stories Reservations",
          reply_to: resData.customerEmail,
          name: resData.customerName,
          customer_name: resData.customerName,
          email: resData.customerEmail,
          customer_email: resData.customerEmail,
          phone: resData.customerPhone,
          customer_phone: resData.customerPhone,
          date: resData.date,
          time: resData.time,
          guests: resData.guests,
          occasion: resData.occasion,
          notes: resData.notes || "None",
          booking_id: resData.bookingId,
          order_items: `Table Reservation #${resData.bookingId} (${resData.guests}) on ${resData.date} at ${resData.time}`,
          message: `Vanakkam!\n\nA new table reservation request #${resData.bookingId} has been booked:\n\n• Guest: ${resData.customerName}\n• Email: ${resData.customerEmail}\n• Phone: ${resData.customerPhone}\n• Date: ${resData.date}\n• Time: ${resData.time}\n• Party Size: ${resData.guests}\n• Occasion: ${resData.occasion}\n• Special Requests: ${resData.notes || "None"}\n\nPlease confirm table seating arrangements.`
        }
      })
    });

    if (res.ok) {
      emailjsSuccess = true;
      console.log(`[EMAILJS SUCCESS] Table Reservation #${resData.bookingId} dispatched to ${adminEmail}`);
    } else {
      const errText = await res.text();
      console.error("[EMAILJS ERROR]", res.status, errText);
    }
  } catch (err) {
    console.error("EmailJS dispatch error:", err);
  }

  // 2. Resend backup if configured
  if (resend) {
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Table Reservation #${resData.bookingId}</title></head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1ece3; color: #30251e; margin: 0; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #faf8f3; border: 1px solid #d9cfc2; border-radius: 12px; overflow: hidden; padding: 32px;">
          <h2 style="color: #a34e36; margin-top: 0;">New Table Reservation #${resData.bookingId}</h2>
          <p>A new table reservation request has been submitted:</p>
          <ul style="line-height: 1.8; list-style: none; padding-left: 0;">
            <li><strong>Guest:</strong> ${resData.customerName}</li>
            <li><strong>Email:</strong> ${resData.customerEmail}</li>
            <li><strong>Phone:</strong> ${resData.customerPhone}</li>
            <li><strong>Date:</strong> ${resData.date}</li>
            <li><strong>Time:</strong> ${resData.time}</li>
            <li><strong>Party Size:</strong> ${resData.guests}</li>
            <li><strong>Occasion:</strong> ${resData.occasion}</li>
            ${resData.notes ? `<li><strong>Notes:</strong> ${resData.notes}</li>` : ""}
          </ul>
          <p style="margin-top: 24px; font-size: 13px; color: #786d62;">Direct Host Line: +91 93846 38754</p>
        </div>
      </body>
      </html>
    `;

    try {
      await resend.emails.send({
        from: emailFrom,
        to: adminEmail,
        subject: `New Table Reservation: #${resData.bookingId} — ${resData.customerName}`,
        html: adminHtml
      });
    } catch (error) {
      console.warn("Resend Email Backup Error:", error);
    }
  }

  return { success: emailjsSuccess || Boolean(resend) };
}
