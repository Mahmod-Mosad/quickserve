import { useEffect, useState } from 'react';
import type { PromoBanner as PromoBannerType } from '../types/promo';
import { getActivePromoBanner } from '../services/promoService';
import './PromoBanner.css';

export default function PromoBanner() {
  const [banner, setBanner] = useState<PromoBannerType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBanner() {
      const data = await getActivePromoBanner();
      setBanner(data);
      setIsLoading(false);
    }
    loadBanner();
  }, []);

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