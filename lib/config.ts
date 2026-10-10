import { z } from "zod";
const optionalUrl = z.string().url().optional().or(z.literal(""));
const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: optionalUrl, NEXT_PUBLIC_SUPABASE_URL: optionalUrl,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(), SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  RAZORPAY_KEY_ID: z.string().optional(), RAZORPAY_KEY_SECRET: z.string().optional(), RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(), EMAIL_FROM: z.string().optional(), SUPPORT_EMAIL: z.string().optional(), SUPPORT_PHONE: z.string().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(), BUSINESS_CURRENCY: z.string().default("INR"), ORDER_FULFILMENT_MODE: z.enum(["delivery","pickup","dine-in","delivery-and-pickup"]).default("pickup")
});
export const config = envSchema.parse(process.env);
export const integrationStatus = { supabase: !!(config.NEXT_PUBLIC_SUPABASE_URL && config.NEXT_PUBLIC_SUPABASE_ANON_KEY), razorpay: !!(config.RAZORPAY_KEY_ID && config.RAZORPAY_KEY_SECRET && config.RAZORPAY_WEBHOOK_SECRET), email: !!(config.RESEND_API_KEY && config.EMAIL_FROM), analytics: !!config.NEXT_PUBLIC_GA_MEASUREMENT_ID };