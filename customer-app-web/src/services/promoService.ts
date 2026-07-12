import type { PromoBanner } from '../types/promo';

// ⚠️ MOCK FUNCTION — هتتستبدل بـ GET /promo/active لما الـ backend يخلص
export async function getActivePromoBanner(): Promise<PromoBanner> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    id: 'promo-1',
    imageUrl: '/src/assets/images/promo-banner.jpg',
    badgeText: 'Exclusive',
    title: 'Taste the Italian Summer',
    description: '20% off authentic Neapolitan pizza and fresh salads.',
  };
}