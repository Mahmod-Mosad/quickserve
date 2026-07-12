export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  logoUrl: string;
  cuisineTags: string[];
  rating: number;
  reviewCount: number;
  deliveryTimeMinutes: string;
  deliveryFee: number | 'free';
  isOpen: boolean;
  discountPercent?: number;
}