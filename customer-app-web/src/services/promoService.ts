import type { PromoBanner } from '../types/promo';

// ⚠️ MOCK FUNCTION — هتتستبدل بـ GET /promo/active?lang=... لما الـ backend يخلص
// دلوقتي بنحاكي إن الباك إند نفسه بيرجع النص باللغة المطلوبة
export async function getActivePromoBanner(language: 'en' | 'ar'): Promise<PromoBanner> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const content = {
    en: {
      badgeText: 'Exclusive',
      title: 'Taste the Italian Summer',
      description: '20% off authentic Neapolitan pizza and fresh salads.',
    },
    ar: {
      badgeText: 'عرض حصري',
      title: 'طعم الصيف الإيطالي',
      description: 'خصم 20% على البيتزا النابولية الأصلية والسلطات الطازة.',
    },
  };

  return {
    id: 'promo-1',
    imageUrl: '/src/assets/images/promo-banner.jpg',
    ...content[language],
  };
}