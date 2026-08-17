import { Truck, PartyPopper } from 'lucide-react';
import type { OrderStage } from '../types/orderTracking';
import { useLanguage } from '../context/LanguageContext';
import './DeliveryStatusHero.css';

interface DeliveryStatusHeroProps {
  stage: OrderStage;
  estimatedMinutes: string;
}

const PROGRESS_PERCENT: Record<OrderStage, number> = {
  confirmed: 25,
  preparing: 50,
  out_for_delivery: 85,
  delivered: 100,
};

export default function DeliveryStatusHero({ stage, estimatedMinutes }: DeliveryStatusHeroProps) {
  const { t } = useLanguage();
  const isDelivered = stage === 'delivered';

  return (
    <div className="delivery-hero">
      <div className="delivery-hero__icon-circle">
        {isDelivered ? <PartyPopper size={40} /> : <Truck size={40} />}
      </div>

      {isDelivered ? (
        <h2 className="delivery-hero__title">{t('orderTracking.deliveredTitle')}</h2>
      ) : (
        <>
          <p className="delivery-hero__label">{t('orderTracking.estimatedArrival')}</p>
          <h2 className="delivery-hero__time">
            {estimatedMinutes} {t('orderTracking.minutesSuffix')}
          </h2>
        </>
      )}

      <div className="delivery-hero__progress-track">
        <div
          className="delivery-hero__progress-fill"
          style={{ width: `${PROGRESS_PERCENT[stage]}%` }}
        />
      </div>
    </div>
  );
}