import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendReservationEmail, ReservationEmailData } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(`res_${ip}`, 10, 60000)) {
      return NextResponse.json(
        { error: "Too many reservation requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { bookingId, name, email, phone, date, time, guests, occasion, notes } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: "Missing required reservation details" },
        { status: 400 }
      );
    }

    const resData: ReservationEmailData = {
      bookingId: bookingId || `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: String(name).trim(),
      customerEmail: String(email).trim().toLowerCase(),
      customerPhone: String(phone || "Not provided").trim(),
      date: String(date),
      time: String(time),
      guests: String(guests || "2 Guests"),
      occasion: String(occasion || "Dinner"),
      notes: notes ? String(notes).trim() : undefined,
    };

    // Trigger email notification
    await sendReservationEmail(resData);

    return NextResponse.json({
      success: true,
      bookingId: resData.bookingId,
      message: "Reservation request recorded successfully."
    });
  } catch (error) {
    console.error("Reservation API Error:", error);
    return NextResponse.json(
      { error: "Failed to process reservation request" },
      { status: 500 }
    );
  }
}
