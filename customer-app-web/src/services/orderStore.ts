import type { CartItem } from '../types/cart';

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  total: number;
}

// ⚠️ MOCK STORAGE — بيستخدم localStorage مؤقتاً كبديل لباك إند حقيقي.
// هيتستبدل بـ GET /orders/:id فعلي لما نربط الباك، وقتها هنمسح الملف ده خالص.
export function saveOrder(order: PlacedOrder) {
  localStorage.setItem(`order-${order.orderId}`, JSON.stringify(order));
}

export function getOrder(orderId: string): PlacedOrder | null {
  const raw = localStorage.getItem(`order-${orderId}`);
  return raw ? JSON.parse(raw) : null;
}