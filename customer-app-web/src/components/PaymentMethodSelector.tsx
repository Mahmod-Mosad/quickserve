import { CreditCard, Smartphone, Banknote } from 'lucide-react';
import './PaymentMethodSelector.css';

export type PaymentMethod = 'card' | 'wallet' | 'cash';

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const options: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { id: 'card', label: 'Card •••• 4242', icon: CreditCard },
  { id: 'wallet', label: 'E-Wallet', icon: Smartphone },
  { id: 'cash', label: 'Cash on Delivery', icon: Banknote },
];

export default function PaymentMethodSelector({ selected, onChange }: PaymentMethodSelectorProps) {
  return (
    <div className="payment-selector">
      {options.map(({ id, label, icon: Icon }) => (
        <label
          key={id}
          className={`payment-selector__option ${selected === id ? 'payment-selector__option--active' : ''}`}
        >
          <input type="radio" name="payment" checked={selected === id} onChange={() => onChange(id)} />
          <Icon size={18} />
          {label}
        </label>
      ))}
    </div>
  );
}