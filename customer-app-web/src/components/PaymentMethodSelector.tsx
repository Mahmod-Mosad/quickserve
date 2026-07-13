import { CreditCard, Smartphone, Banknote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './PaymentMethodSelector.css';

export type PaymentMethod = 'card' | 'wallet' | 'cash';

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const options: { id: PaymentMethod; labelKey: string; icon: typeof CreditCard }[] = [
  { id: 'card', labelKey: 'cardLabel', icon: CreditCard },
  { id: 'wallet', labelKey: 'walletLabel', icon: Smartphone },
  { id: 'cash', labelKey: 'cashLabel', icon: Banknote },
];

export default function PaymentMethodSelector({ selected, onChange }: PaymentMethodSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="payment-selector">
      {options.map(({ id, labelKey, icon: Icon }) => (
        <label
          key={id}
          className={`payment-selector__option ${selected === id ? 'payment-selector__option--active' : ''}`}
        >
          <input type="radio" name="payment" checked={selected === id} onChange={() => onChange(id)} />
          <Icon size={18} />
          {t(`checkout.${labelKey}`)}
        </label>
      ))}
    </div>
  );
}