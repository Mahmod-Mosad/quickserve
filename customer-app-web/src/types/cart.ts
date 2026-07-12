export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  size: string;
  extras: string[];
  quantity: number;
  unitPrice: number;
  notes: string;
}