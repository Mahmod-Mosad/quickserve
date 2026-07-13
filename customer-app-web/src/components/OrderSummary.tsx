import { useLanguage } from '../context/LanguageContext';
import './OrderSummary.css';

interface OrderSummaryProps {
  subtotal: number;
}

const MOCK_DELIVERY_FEE = 3.99;
const MOCK_SERVICE_FEE = 2.5;

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
  const { t } = useLanguage();
  const total = subtotal + MOCK_DELIVERY_FEE + MOCK_SERVICE_FEE;

  return (
    <div className="order-summary">
      <h3 className="order-summary__title">{t('checkout.orderSummary')}</h3>

      <div className="order-summary__row">
        <span>{t('checkout.subtotal')}</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="order-summary__row">
        <span>{t('checkout.deliveryFee')}</span>
        <span>${MOCK_DELIVERY_FEE.toFixed(2)}</span>
      </div>
      <div className="order-summary__row">
        <span>{t('checkout.serviceFee')}</span>
        <span>${MOCK_SERVICE_FEE.toFixed(2)}</span>
      </div>

      <div className="order-summary__total">
        <span>{t('checkout.total')}</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}