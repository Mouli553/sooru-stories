import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1").max(25, "Maximum 25 units per item"),
  // Price sent by client is treated as advisory only; server ALWAYS recalculates against menu catalog!
  pricePaise: z.number().int().optional()
});

export const createOrderSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters").max(100),
  customerEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
  fulfilmentMode: z.enum(["delivery", "pickup", "dine-in"]),
  deliveryAddress: z
    .object({
      line1: z.string().min(3, "Address line 1 is required"),
      line2: z.string().optional().nullable(),
      landmark: z.string().optional().nullable(),
      city: z.string().default("Sathyamangalam"),
      state: z.string().default("Tamil Nadu"),
      pincode: z.string().default("638401")
    })
    .optional()
    .nullable(),
  specialInstructions: z.string().max(500).optional().nullable(),
  items: z.array(orderItemSchema).min(1, "Order must have at least one item"),
  paymentMode: z.enum(["online", "cod"]).default("online"),
  couponCode: z.string().optional().nullable(),
  idempotencyKey: z.string().optional().nullable(),
  // Anti-spam honeypot field
  b_website: z.string().optional().nullable(),
  // Marketing attribution
  attribution: z
    .object({
      utm_source: z.string().optional().nullable(),
      utm_medium: z.string().optional().nullable(),
      utm_campaign: z.string().optional().nullable(),
      utm_term: z.string().optional().nullable(),
      utm_content: z.string().optional().nullable()
    })
    .optional()
    .nullable(),
  // Razorpay verification data if already completed on client
  razorpay_payment_id: z.string().optional().nullable(),
  razorpay_order_id: z.string().optional().nullable(),
  razorpay_signature: z.string().optional().nullable()
});

export const razorpayVerifySchema = z.object({
  orderNumber: z.string().min(1, "Order number is required"),
  razorpay_order_id: z.string().min(1, "Razorpay Order ID is required"),
  razorpay_payment_id: z.string().min(1, "Razorpay Payment ID is required"),
  razorpay_signature: z.string().min(1, "Razorpay Signature is required")
});

export const updateOrderStatusSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required"),
  newStatus: z.enum([
    "pending_payment",
    "payment_verification",
    "paid",
    "processing",
    "ready_for_pickup",
    "out_for_delivery",
    "delivered",
    "cancelled",
    "refunded"
  ]),
  note: z.string().max(300).optional().nullable()
});

export const syncCartSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().min(1).max(25)
    })
  )
});
