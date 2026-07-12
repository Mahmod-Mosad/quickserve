import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem } from '../types/cart';

interface PendingConflict {
  item: CartItem;
  vendorId: string;
}

interface CartContextValue {
  items: CartItem[];
  vendorId: string | null;
  pendingConflict: PendingConflict | null;
  addItem: (item: CartItem, fromVendorId: string) => void;
  resolveConflict: (confirmed: boolean) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [pendingConflict, setPendingConflict] = useState<PendingConflict | null>(null);

  function addItem(item: CartItem, fromVendorId: string) {
    if (vendorId && vendorId !== fromVendorId && items.length > 0) {
      setPendingConflict({ item, vendorId: fromVendorId });
      return;
    }

    setItems((prev) => [...prev, item]);
    setVendorId(fromVendorId);
  }

  function resolveConflict(confirmed: boolean) {
    if (confirmed && pendingConflict) {
      setItems([pendingConflict.item]);
      setVendorId(pendingConflict.vendorId);
    }
    setPendingConflict(null);
  }

  function removeItem(itemId: string) {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }

  function updateQuantity(itemId: string, newQuantity: number) {
    if (newQuantity < 1) return;
    setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i)));
  }

  function clearCart() {
    setItems([]);
    setVendorId(null);
  }

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        vendorId,
        pendingConflict,
        addItem,
        resolveConflict,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}