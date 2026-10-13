import { describe, it, expect } from "vitest";
import { createOrderSchema, razorpayVerifySchema, updateOrderStatusSchema } from "../lib/validations";

describe("Validation Schemas", () => {
  it("accepts valid delivery order payload", () => {
    const validOrder = {
      customerName: "Ramesh Kumar",
      customerPhone: "9876543210",
      customerEmail: "ramesh@example.com",
      fulfilmentMode: "delivery" as const,
      deliveryAddress: {
        line1: "12 Gandhi Road",
        city: "Sathyamangalam",
        state: "Tamil Nadu",
        pincode: "638401"
      },
      items: [
        { productId: "rasam-thakkali", quantity: 2 },
        { productId: "biryani-ambur", quantity: 1 }
      ],
      paymentMode: "online" as const
    };

    const result = createOrderSchema.safeParse(validOrder);
    expect(result.success).toBe(true);
  });

  it("rejects order with empty items array", () => {
    const emptyOrder = {
      customerName: "Ramesh Kumar",
      customerPhone: "9876543210",
      fulfilmentMode: "pickup" as const,
      items: []
    };

    const result = createOrderSchema.safeParse(emptyOrder);
    expect(result.success).toBe(false);
  });

  it("rejects item quantities exceeding 25", () => {
    const excessiveOrder = {
      customerName: "Ramesh Kumar",
      customerPhone: "9876543210",
      fulfilmentMode: "pickup" as const,
      items: [{ productId: "biryani-ambur", quantity: 99 }]
    };

    const result = createOrderSchema.safeParse(excessiveOrder);
    expect(result.success).toBe(false);
  });

  it("validates Razorpay signature verification schema", () => {
    const payload = {
      orderNumber: "SS-849201",
      razorpay_order_id: "order_K8d82js9s",
      razorpay_payment_id: "pay_K8d84ls02",
      razorpay_signature: "a1b2c3d4e5f6"
    };

    const result = razorpayVerifySchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("validates admin order status update transitions", () => {
    const valid = {
      orderNumber: "SS-849201",
      newStatus: "delivered" as const,
      note: "Handed over to customer"
    };
    expect(updateOrderStatusSchema.safeParse(valid).success).toBe(true);

    const invalid = {
      orderNumber: "SS-849201",
      newStatus: "invalid_status"
    };
    expect(updateOrderStatusSchema.safeParse(invalid).success).toBe(false);
  });
});
