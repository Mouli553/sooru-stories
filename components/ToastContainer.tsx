"use client";

import React from "react";
import { useCart } from "@/lib/cart";

export default function ToastContainer() {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div className="toast-banner" role="status" aria-live="polite">
      <span>✨</span>
      <span>{toastMessage}</span>
    </div>
  );
}
