"use client";

import { MenuItem } from "./menu";
import { CartItem } from "./cart";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-SOORUSTORY";

export function trackEvent(action: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

export function trackViewItemList(items: MenuItem[], listName = "Menu Showcase") {
  trackEvent("view_item_list", {
    item_list_name: listName,
    items: items.map((item, index) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      price: item.pricePaise / 100,
      index: index + 1
    }))
  });
}

export function trackSelectItem(item: MenuItem, listName = "Menu Showcase") {
  trackEvent("select_item", {
    item_list_name: listName,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.pricePaise / 100
      }
    ]
  });
}

export function trackViewItem(item: MenuItem) {
  trackEvent("view_item", {
    currency: "INR",
    value: item.pricePaise / 100,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.pricePaise / 100
      }
    ]
  });
}

export function trackAddToCart(item: MenuItem, quantity = 1) {
  trackEvent("add_to_cart", {
    currency: "INR",
    value: (item.pricePaise * quantity) / 100,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.pricePaise / 100,
        quantity
      }
    ]
  });
}

export function trackRemoveFromCart(item: MenuItem) {
  trackEvent("remove_from_cart", {
    currency: "INR",
    value: item.pricePaise / 100,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.pricePaise / 100
      }
    ]
  });
}

export function trackBeginCheckout(items: CartItem[], totalPaise: number) {
  trackEvent("begin_checkout", {
    currency: "INR",
    value: totalPaise / 100,
    items: items.map((ci) => ({
      item_id: ci.product.id,
      item_name: ci.product.name,
      item_category: ci.product.category,
      price: ci.product.pricePaise / 100,
      quantity: ci.quantity
    }))
  });
}

export function trackPurchase(
  orderId: string,
  items: CartItem[],
  totalPaise: number,
  paymentMode: string
) {
  trackEvent("purchase", {
    transaction_id: orderId,
    currency: "INR",
    value: totalPaise / 100,
    payment_type: paymentMode,
    items: items.map((ci) => ({
      item_id: ci.product.id,
      item_name: ci.product.name,
      item_category: ci.product.category,
      price: ci.product.pricePaise / 100,
      quantity: ci.quantity
    }))
  });
}

export function trackLead(type: "table_booking" | "catering_enquiry" | "whatsapp_chat", metadata: Record<string, unknown> = {}) {
  trackEvent("generate_lead", {
    lead_type: type,
    ...metadata
  });
}
