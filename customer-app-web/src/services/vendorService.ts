import type { VendorDetails } from '../types/vendor';
import type { MenuItem } from '../types/menuItem';

// ⚠️ MOCK FUNCTION — هتتستبدل بـ GET /vendors/:id لما الباك يخلص
export async function getVendorDetails(vendorId: string): Promise<VendorDetails> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id: vendorId,
    name: 'Fresh Bowl & Co.',
    coverImageUrl: '/src/assets/images/restaurant-1.jpg',
    rating: 4.8,
    reviewCount: 200,
    deliveryTimeMinutes: '20-30',
    description:
      'Healthy, locally sourced grain bowls and fresh salads crafted for a vibrant lifestyle. Fuel your day with nature\'s best ingredients.',
  };
}

// ⚠️ MOCK FUNCTION — هتتستبدل بـ GET /vendors/:id/menu-items لما الباك يخلص
export async function getMenuItems(vendorId: string): Promise<MenuItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: 'm1',
      name: 'Classic Quinoa Bowl',
      description: 'Organic quinoa, grilled herb chicken, cherry tomatoes, cucumber, feta',
      price: 14.5,
      imageUrl: '/src/assets/images/restaurant-1.jpg',
      category: 'Popular',
    },
    {
      id: 'm2',
      name: 'Pacific Salmon Salad',
      description: 'Wild-caught seared salmon, mixed baby greens, edamame, radish, sesame',
      price: 16.0,
      imageUrl: '/src/assets/images/restaurant-2.jpg',
      category: 'Popular',
    },
    {
      id: 'm3',
      name: 'Spicy Buddha Bowl',
      description: 'Roasted sweet potatoes, spiced chickpeas, steamed broccoli, brown rice',
      price: 13.5,
      imageUrl: '/src/assets/images/restaurant-3.jpg',
      badge: 'Vegan',
      category: 'Popular',
    },
    {
      id: 'm4',
      name: 'Green Detox Smoothie',
      description: 'Spinach, mango, banana, coconut water',
      price: 7.5,
      imageUrl: '/src/assets/images/restaurant-1.jpg',
      badge: 'Vegan',
      category: 'Smoothies & Drinks',
    },
    {
      id: 'm5',
      name: 'Mango Turmeric Smoothie',
      description: 'Mango, turmeric, ginger, almond milk',
      price: 8.0,
      imageUrl: '/src/assets/images/restaurant-2.jpg',
      badge: 'Vegan',
      category: 'Smoothies & Drinks',
    },
    {
      id: 'm6',
      name: 'Mediterranean Grain Bowl',
      description: 'Farro, roasted vegetables, hummus, tzatziki, olives',
      price: 15.0,
      imageUrl: '/src/assets/images/restaurant-3.jpg',
      category: 'Grain Bowls',
    },
    {
      id: 'm7',
      name: 'Teriyaki Rice Bowl',
      description: 'Brown rice, grilled tofu, edamame, teriyaki glaze',
      price: 13.0,
      imageUrl: '/src/assets/images/restaurant-1.jpg',
      badge: 'Vegan',
      category: 'Grain Bowls',
    },
    {
      id: 'm8',
      name: 'Caesar Salad',
      description: 'Romaine, parmesan, croutons, grilled chicken, caesar dressing',
      price: 12.0,
      imageUrl: '/src/assets/images/restaurant-2.jpg',
      category: 'Fresh Salads',
    },
    {
      id: 'm9',
      name: 'Greek Salad',
      description: 'Tomatoes, cucumber, feta, olives, red onion, oregano',
      price: 11.5,
      imageUrl: '/src/assets/images/restaurant-3.jpg',
      category: 'Fresh Salads',
    },
    {
      id: 'm10',
      name: 'Sweet Potato Fries',
      description: 'Crispy baked sweet potato fries with chipotle mayo',
      price: 6.5,
      imageUrl: '/src/assets/images/restaurant-1.jpg',
      badge: 'Vegan',
      category: 'Sides & Snacks',
    },
    {
      id: 'm11',
      name: 'Hummus & Pita',
      description: 'House-made hummus with warm pita bread',
      price: 5.5,
      imageUrl: '/src/assets/images/restaurant-2.jpg',
      category: 'Sides & Snacks',
    },
  ];
}