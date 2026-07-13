import { useEffect, useState } from 'react';
import type { PromoBanner as PromoBannerType } from '../types/promo';
import { getActivePromoBanner } from '../services/promoService';
import { useLanguage } from '../context/LanguageContext';
import './PromoBanner.css';

export default function PromoBanner() {
  const [banner, setBanner] = useState<PromoBannerType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    async function loadBanner() {
      setIsLoading(true);
      const data = await getActivePromoBanner(language);
      setBanner(data);
      setIsLoading(false);
    }
    loadBanner();
    // الاعتماد على [language] بيخلي البانر يتجاب تاني بلغة جديدة كل مرة اليوزر يبدّل اللغة
  }, [language]);

  if (isLoading || !banner) {
    return <div className="promo-banner promo-banner--loading" />;
  }

  return (
    <div className="promo-banner">
      <img src={banner.imageUrl} alt="" className="promo-banner__image" />
      <div className="promo-banner__overlay">
        <span className="promo-banner__badge">{banner.badgeText}</span>
        <h2 className="promo-banner__title">{banner.title}</h2>
        <p className="promo-banner__description">{banner.description}</p>
      </div>
    </div>
  );
}