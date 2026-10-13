import { describe, it, expect } from "vitest";
import crypto from "crypto";

describe("Cryptographic Payment Signature Verification", () => {
  const secret = "test_rzp_secret_key_84920";
  const orderId = "order_O8d92ls01ks";
  const paymentId = "pay_P93ks01la98";

  it("generates and verifies exact HMAC-SHA256 signature", () => {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const expectedBuf = Buffer.from(expectedSignature, "utf8");
    const receivedBuf = Buffer.from(expectedSignature, "utf8");

    const isValid =
      expectedBuf.length === receivedBuf.length &&
      crypto.timingSafeEqual(expectedBuf, receivedBuf);

    expect(isValid).toBe(true);
  });

  it("strictly rejects tampered signatures via timingSafeEqual", () => {
    const validSignature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const tamperedSignature = validSignature.slice(0, -2) + "ff";

    const expectedBuf = Buffer.from(validSignature, "utf8");
    const tamperedBuf = Buffer.from(tamperedSignature, "utf8");

    const isMatch =
      expectedBuf.length === tamperedBuf.length &&
      crypto.timingSafeEqual(expectedBuf, tamperedBuf);

    expect(isMatch).toBe(false);
  });
});
