import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types/cart';
import { useLanguage } from '../context/LanguageContext';
import './CartItemRow.css';

interface CartItemRowProps {
  item: CartItem;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}

export default function CartItemRow({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  const { t } = useLanguage();
  const detailsText = [item.size, ...item.extras].filter(Boolean).join(', ');

  return (
    <div className="cart-item-row">
      <div className="cart-item-row__info">
        <h4 className="cart-item-row__name">{item.name}</h4>
        {detailsText && <p className="cart-item-row__details">{detailsText}</p>}
        {item.notes && (
          <p className="cart-item-row__notes">
            {t('vendorMenu.notes')}: {item.notes}
          </p>
        )}

        <div className="cart-item-row__quantity">
          <button onClick={() => onDecrease(item.id)} aria-label="Decrease quantity">
            <Minus size={14} />
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrease(item.id)} aria-label="Increase quantity">
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="cart-item-row__side">
        <span className="cart-item-row__price">${(item.unitPrice * item.quantity).toFixed(2)}</span>
        <button onClick={() => onRemove(item.id)} className="cart-item-row__remove">
          <Trash2 size={13} />
          {t('checkout.remove')}
        </button>
      </div>
    </div>
  );
}