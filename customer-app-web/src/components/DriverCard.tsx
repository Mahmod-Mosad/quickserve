import { Star, MessageCircle, Phone, User } from 'lucide-react';
import type { DriverInfo } from '../types/driver';
import { useLanguage } from '../context/LanguageContext';
import './DriverCard.css';

interface DriverCardProps {
  driver: DriverInfo;
}

export default function DriverCard({ driver }: DriverCardProps) {
  const { t } = useLanguage();

  function handleMessage() {
    console.log('Open chat with driver:', driver.id);
  }

  function handleCall() {
    console.log('Call driver:', driver.id);
  }

  return (
    <div className="driver-card">
      <span className="driver-card__avatar">
        <User size={22} />
      </span>

      <div className="driver-card__info">
        <p className="driver-card__name">{driver.name}</p>
        <p className="driver-card__meta">
          <Star size={12} fill="currentColor" />
          {driver.rating} ({(driver.deliveryCount / 1000).toFixed(1)}k {t('orderTracking.deliveries')})
        </p>
      </div>

      <div className="driver-card__actions">
        <button onClick={handleMessage} className="driver-card__action-btn" aria-label="Message driver">
          <MessageCircle size={16} />
        </button>
        <button onClick={handleCall} className="driver-card__action-btn driver-card__action-btn--call" aria-label="Call driver">
          <Phone size={16} />
        </button>
      </div>
    </div>
  );
}