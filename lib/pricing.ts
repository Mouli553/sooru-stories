export type CartLine = { productId: string; quantity: number };
export function calculateSubtotal(lines: CartLine[], catalogue: {id:string;pricePaise:number;available:boolean}[]) {
 if (!Array.isArray(lines) || lines.length > 100) throw new Error("Invalid cart size");
 const seen = new Set<string>(); let subtotal = 0;
 for (const line of lines) {
  if (!line.productId || seen.has(line.productId)) throw new Error("Duplicate or invalid product in cart"); seen.add(line.productId);
  if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 25) throw new Error("Quantity must be between 1 and 25");
  const product = catalogue.find(p=>p.id===line.productId); if (!product || !product.available) throw new Error("Product unavailable");
  subtotal += product.pricePaise * line.quantity;
  if (!Number.isSafeInteger(subtotal)) throw new Error("Cart total exceeds supported limit");
 }
 return subtotal;
}
