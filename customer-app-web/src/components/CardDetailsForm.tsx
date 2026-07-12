import { useState } from 'react';
import './CardDetailsForm.css';

export interface CardDetails {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
}

interface CardDetailsFormProps {
  onChange: (details: CardDetails) => void;
}

export default function CardDetailsForm({ onChange }: CardDetailsFormProps) {
  const [details, setDetails] = useState<CardDetails>({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: '',
  });

  function updateField<K extends keyof CardDetails>(field: K, value: CardDetails[K]) {
    const updated = { ...details, [field]: value };
    setDetails(updated);
    onChange(updated);
  }

  return (
    <div className="card-details-form">
      <label className="card-details-form__field card-details-form__field--full">
        <span>Cardholder Name</span>
        <input
          type="text"
          value={details.cardholderName}
          onChange={(e) => updateField('cardholderName', e.target.value)}
          placeholder="Name on card"
        />
      </label>

      <label className="card-details-form__field card-details-form__field--full">
        <span>Card Number</span>
        <input
          type="text"
          value={details.cardNumber}
          onChange={(e) => updateField('cardNumber', e.target.value)}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
      </label>

      <label className="card-details-form__field">
        <span>Expiry (MM/YY)</span>
        <input
          type="text"
          value={details.expiry}
          onChange={(e) => updateField('expiry', e.target.value)}
          placeholder="MM/YY"
          maxLength={5}
        />
      </label>

      <label className="card-details-form__field">
        <span>CVV</span>
        <input
          type="text"
          value={details.cvv}
          onChange={(e) => updateField('cvv', e.target.value)}
          placeholder="123"
          maxLength={4}
        />
      </label>
    </div>
  );
}