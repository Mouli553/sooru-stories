import { NextResponse } from "next/server";
import { syncCartSchema } from "@/lib/validations";
import { menuItems } from "@/lib/menu";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    let user = null;
    try {
      const supabase = await createSupabaseServerClient();
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch {
      // Supabase not configured in local environment
    }

    if (!user) {
      return NextResponse.json({ authenticated: false, items: [] });
    }

    const supabase = await createSupabaseServerClient();
    const { data: cart } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!cart) {
      return NextResponse.json({ authenticated: true, items: [] });
    }

    const { data: cartItems } = await supabase
      .from("cart_items")
      .select("product_id, quantity")
      .eq("cart_id", cart.id);

    const items = (cartItems || [])
      .map((ci) => {
        const dish = menuItems.find((m) => m.id === ci.product_id);
        return dish ? { product: dish, quantity: ci.quantity } : null;
      })
      .filter(Boolean);

    return NextResponse.json({ authenticated: true, items });
  } catch (error) {
    console.error("Cart Fetch Error:", error);
    return NextResponse.json({ authenticated: false, items: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = syncCartSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid cart sync payload" }, { status: 400 });
    }

    let user = null;
    try {
      const supabase = await createSupabaseServerClient();
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch {
      // Supabase not connected
    }

    if (!user) {
      // Return success for guest cart local storage
      return NextResponse.json({ synced: false, guest: true });
    }

    const supabase = await createSupabaseServerClient();

    // Ensure user has a cart
    let { data: cart } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!cart) {
      const { data: newCart } = await supabase
        .from("carts")
        .insert({ user_id: user.id })
        .select("id")
        .single();
      cart = newCart;
    }

    if (cart) {
      // Clear existing items and insert latest synced items
      await supabase.from("cart_items").delete().eq("cart_id", cart.id);

      if (result.data.items.length > 0) {
        const rows = result.data.items.map((item) => ({
          cart_id: cart.id,
          product_id: item.productId,
          quantity: item.quantity
        }));
        await supabase.from("cart_items").insert(rows);
      }
    }

    return NextResponse.json({ synced: true, count: result.data.items.length });
  } catch (error) {
    console.error("Cart Sync Error:", error);
    return NextResponse.json({ error: "Failed to sync cart" }, { status: 500 });
  }
}
