import './OrderSummary.css';

interface OrderSummaryProps {
  subtotal: number;
}

const MOCK_DELIVERY_FEE = 3.99;
const MOCK_SERVICE_FEE = 2.5;

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
  const total = subtotal + MOCK_DELIVERY_FEE + MOCK_SERVICE_FEE;

  return (
    <div className="order-summary">
      <h3 className="order-summary__title">Order Summary</h3>

      <div className="order-summary__row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="order-summary__row">
        <span>Delivery Fee</span>
        <span>${MOCK_DELIVERY_FEE.toFixed(2)}</span>
      </div>
      <div className="order-summary__row">
        <span>Service Fee</span>
        <span>${MOCK_SERVICE_FEE.toFixed(2)}</span>
      </div>

      <div className="order-summary__total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}