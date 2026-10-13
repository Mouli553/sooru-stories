"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "./menu";

export interface CartItem {
  product: MenuItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: MenuItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalPaise: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isOrderModalOpen: boolean;
  openOrderModal: () => void;
  closeOrderModal: () => void;
  isBookingModalOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "sooru_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // LocalStorage unavailable
    }
    setIsLoaded(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // LocalStorage quota or unavailable
      }
    }
  }, [items, isLoaded]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const addToCart = (product: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPaise = items.reduce(
    (sum, item) => sum + item.product.pricePaise * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalPaise,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isOrderModalOpen,
        openOrderModal: () => setIsOrderModalOpen(true),
        closeOrderModal: () => setIsOrderModalOpen(false),
        isBookingModalOpen,
        openBookingModal: () => setIsBookingModalOpen(true),
        closeBookingModal: () => setIsBookingModalOpen(false),
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
