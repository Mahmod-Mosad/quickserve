import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import DeliveryStatusHero from '../../components/DeliveryStatusHero';
import OrderStatusTimeline from '../../components/OrderStatusTimeline';
import DriverCard from '../../components/DriverCard';
import { getDriverInfo } from '../../services/orderTrackingService';
import { getOrder, type PlacedOrder } from '../../services/orderStore';
import { STAGE_ORDER, type OrderStage } from '../../types/orderTracking';
import type { DriverInfo } from '../../types/driver';
import { useLanguage } from '../../context/LanguageContext';
import './OrderTrackingPage.css';

export default function OrderTrackingPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { t } = useLanguage();

  const [currentStage, setCurrentStage] = useState<OrderStage>('confirmed');
  const [stageTimestamps, setStageTimestamps] = useState<Partial<Record<OrderStage, Date>>>({
    confirmed: new Date(),
  });
  const [driver, setDriver] = useState<DriverInfo | null>(null);
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    if (!orderId) return;
    getDriverInfo(orderId).then(setDriver);
    setOrder(getOrder(orderId));
  }, [orderId]);

  function handleNextStage() {
    const currentIndex = STAGE_ORDER.indexOf(currentStage);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= STAGE_ORDER.length) return;

    const nextStage = STAGE_ORDER[nextIndex];
    setCurrentStage(nextStage);
    setStageTimestamps((prev) => ({ ...prev, [nextStage]: new Date() }));
  }

  function handleReportProblem() {
    // placeholder — هيتفعل لما نبني شاشة "Report a Problem" الفعلية
    console.log('Report a problem for order:', orderId);
  }

  const showDriver =
    STAGE_ORDER.indexOf(currentStage) >= STAGE_ORDER.indexOf('out_for_delivery');

  return (
    <div className="order-tracking-page">
      <Navbar />

      <div className="order-tracking-page__content">
        <DeliveryStatusHero stage={currentStage} estimatedMinutes="15-25" />

        <div className="order-tracking-page__grid">
          <div className="order-tracking-page__card">
            <OrderStatusTimeline currentStage={currentStage} stageTimestamps={stageTimestamps} />
          </div>

          {showDriver && driver && <DriverCard driver={driver} />}

          {order && (
            <div className="order-tracking-page__card">
              <h3 className="order-tracking-page__card-title">{t('orderTracking.yourOrder')}</h3>
              {order.items.map((item) => (
                <div key={item.id} className="order-tracking-page__order-row">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <button onClick={handleReportProblem} className="order-tracking-page__report-button">
            <AlertCircle size={16} />
            {t('orderTracking.reportProblem')}
          </button>
        </div>

        {currentStage !== 'delivered' && (
          <button onClick={handleNextStage} className="order-tracking-page__dev-button">
            {t('orderTracking.nextStageDev')}
          </button>
        )}
      </div>
    </div>
  );
}