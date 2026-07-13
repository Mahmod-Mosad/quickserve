import type { VendorDetails } from '../types/vendor';
import type { MenuItem } from '../types/menuItem';

// ⚠️ MOCK FUNCTION — هتتستبدل بـ GET /vendors/:id?lang=... لما الباك يخلص
export async function getVendorDetails(vendorId: string, language: 'en' | 'ar'): Promise<VendorDetails> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const content = {
    en: {
      name: 'Fresh Bowl & Co.',
      description:
        "Healthy, locally sourced grain bowls and fresh salads crafted for a vibrant lifestyle. Fuel your day with nature's best ingredients.",
    },
    ar: {
      name: 'فريش بول آند كو',
      description: 'أطباق حبوب وسلطات طازة صحية من مكونات محلية، مصممة لأسلوب حياة نشيط. اشحن يومك بأفضل ما تقدمه الطبيعة.',
    },
  };

  return {
    id: vendorId,
    coverImageUrl: '/src/assets/images/restaurant-1.jpg',
    rating: 4.8,
    reviewCount: 200,
    deliveryTimeMinutes: '20-30',
    ...content[language],
  };
}

// ⚠️ MOCK FUNCTION — هتتستبدل بـ GET /vendors/:id/menu-items?lang=... لما الباك يخلص
export async function getMenuItems(vendorId: string, language: 'en' | 'ar'): Promise<MenuItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const content = {
    en: [
      { name: 'Classic Quinoa Bowl', description: 'Organic quinoa, grilled herb chicken, cherry tomatoes, cucumber, feta' },
      { name: 'Pacific Salmon Salad', description: 'Wild-caught seared salmon, mixed baby greens, edamame, radish, sesame' },
      { name: 'Spicy Buddha Bowl', description: 'Roasted sweet potatoes, spiced chickpeas, steamed broccoli, brown rice' },
      { name: 'Green Detox Smoothie', description: 'Spinach, mango, banana, coconut water' },
      { name: 'Mango Turmeric Smoothie', description: 'Mango, turmeric, ginger, almond milk' },
      { name: 'Mediterranean Grain Bowl', description: 'Farro, roasted vegetables, hummus, tzatziki, olives' },
      { name: 'Teriyaki Rice Bowl', description: 'Brown rice, grilled tofu, edamame, teriyaki glaze' },
      { name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, grilled chicken, caesar dressing' },
      { name: 'Greek Salad', description: 'Tomatoes, cucumber, feta, olives, red onion, oregano' },
      { name: 'Sweet Potato Fries', description: 'Crispy baked sweet potato fries with chipotle mayo' },
      { name: 'Hummus & Pita', description: 'House-made hummus with warm pita bread' },
    ],
    ar: [
      { name: 'وعاء الكينوا الكلاسيكي', description: 'كينوا عضوية، دجاج مشوي بالأعشاب، طماطم كرزية، خيار، جبنة فيتا' },
      { name: 'سلطة سلمون الباسيفيك', description: 'سلمون مشوي طازة، خضار ورقية، إدامامي، فجل، سمسم' },
      { name: 'وعاء بوذا الحار', description: 'بطاطا حلوة مشوية، حمص متبل، بروكلي مطهو، أرز بني' },
      { name: 'سموذي ديتوكس أخضر', description: 'سبانخ، مانجو، موز، مية جوز الهند' },
      { name: 'سموذي مانجو وكركم', description: 'مانجو، كركم، زنجبيل، حليب لوز' },
      { name: 'وعاء الحبوب المتوسطي', description: 'فارو، خضار مشوية، حمص، تزاتزيكي، زيتون' },
      { name: 'وعاء أرز تيرياكي', description: 'أرز بني، توفو مشوي، إدامامي، صوص تيرياكي' },
      { name: 'سلطة سيزر', description: 'خس روماني، جبنة بارميزان، خبز محمص، دجاج مشوي، صوص سيزر' },
      { name: 'سلطة يونانية', description: 'طماطم، خيار، جبنة فيتا، زيتون، بصل أحمر، أوريجانو' },
      { name: 'بطاطا حلوة مقلية', description: 'بطاطا حلوة مقرمشة مخبوزة مع مايونيز الشيبوتلي' },
      { name: 'حمص وعيش', description: 'حمص بيتي مع عيش دافي' },
    ],
  };

  const items = content[language];
  const meta: Array<{ id: string; price: number; imageUrl: string; category: string; badge?: string }> = [
    { id: 'm1', price: 14.5, imageUrl: '/src/assets/images/restaurant-1.jpg', category: 'popular' },
    { id: 'm2', price: 16.0, imageUrl: '/src/assets/images/restaurant-2.jpg', category: 'popular' },
    { id: 'm3', price: 13.5, imageUrl: '/src/assets/images/restaurant-3.jpg', category: 'popular', badge: 'Vegan' },
    { id: 'm4', price: 7.5, imageUrl: '/src/assets/images/restaurant-1.jpg', category: 'smoothiesDrinks', badge: 'Vegan' },
    { id: 'm5', price: 8.0, imageUrl: '/src/assets/images/restaurant-2.jpg', category: 'smoothiesDrinks', badge: 'Vegan' },
    { id: 'm6', price: 15.0, imageUrl: '/src/assets/images/restaurant-3.jpg', category: 'grainBowls' },
    { id: 'm7', price: 13.0, imageUrl: '/src/assets/images/restaurant-1.jpg', category: 'grainBowls', badge: 'Vegan' },
    { id: 'm8', price: 12.0, imageUrl: '/src/assets/images/restaurant-2.jpg', category: 'freshSalads' },
    { id: 'm9', price: 11.5, imageUrl: '/src/assets/images/restaurant-3.jpg', category: 'freshSalads' },
    { id: 'm10', price: 6.5, imageUrl: '/src/assets/images/restaurant-1.jpg', category: 'sidesSnacks', badge: 'Vegan' },
    { id: 'm11', price: 5.5, imageUrl: '/src/assets/images/restaurant-2.jpg', category: 'sidesSnacks' },
  ];

  return meta.map((m, index) => ({ ...m, ...items[index] }));
}