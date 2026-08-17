import { Check, ChefHat, Bike, Home } from 'lucide-react';
import { STAGE_ORDER, type OrderStage } from '../types/orderTracking';
import { useLanguage } from '../context/LanguageContext';
import './OrderStatusTimeline.css';

interface OrderStatusTimelineProps {
  currentStage: OrderStage;
  stageTimestamps: Partial<Record<OrderStage, Date>>;
}

const STAGE_ICONS: Record<OrderStage, typeof Check> = {
  confirmed: Check,
  preparing: ChefHat,
  out_for_delivery: Bike,
  delivered: Home,
};

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function OrderStatusTimeline({ currentStage, stageTimestamps }: OrderStatusTimelineProps) {
  const { t } = useLanguage();
  const currentIndex = STAGE_ORDER.indexOf(currentStage);

  return (
    <div className="order-timeline">
      {STAGE_ORDER.map((stage, index) => {
        const Icon = STAGE_ICONS[stage];
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        const isUpcoming = index > currentIndex;
        const timestamp = stageTimestamps[stage];

        return (
          <div
            key={stage}
            className={`order-timeline__step ${isActive ? 'order-timeline__step--active' : ''} ${
              isUpcoming ? 'order-timeline__step--upcoming' : ''
            }`}
          >
            <span className="order-timeline__icon">
              {isCompleted ? <Check size={16} /> : <Icon size={16} />}
            </span>

            <div className="order-timeline__text">
              <p className="order-timeline__label">{t(`orderTracking.stages.${stage}`)}</p>
              {timestamp && <p className="order-timeline__time">{formatTime(timestamp)}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}