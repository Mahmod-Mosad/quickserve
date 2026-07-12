import { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import type { MenuItem } from '../types/menuItem';
import type { CartItem } from '../types/cart';
import './ItemOptionsModal.css';

interface ItemOptionsModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (cartItem: CartItem) => void;
}

const sizeOptions = [
  { id: 'small', label: 'Small', priceModifier: 0 },
  { id: 'medium', label: 'Medium', priceModifier: 2 },
  { id: 'large', label: 'Large', priceModifier: 4 },
];

const extraOptions = [
  { id: 'extra-cheese', label: 'Extra Cheese', priceModifier: 1.5 },
  { id: 'extra-sauce', label: 'Extra Sauce', priceModifier: 0.5 },
  { id: 'no-onions', label: 'No Onions', priceModifier: 0 },
];

export default function ItemOptionsModal({ item, isOpen, onClose, onConfirm }: ItemOptionsModalProps) {
  const [selectedSizeId, setSelectedSizeId] = useState(sizeOptions[0].id);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  function toggleExtra(extraId: string) {
    setSelectedExtraIds((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId],
    );
  }

  const selectedSize = sizeOptions.find((s) => s.id === selectedSizeId)!;
  const selectedExtras = extraOptions.filter((e) => selectedExtraIds.includes(e.id));
  const unitPrice =
    item.price + selectedSize.priceModifier + selectedExtras.reduce((sum, e) => sum + e.priceModifier, 0);

  function handleConfirm() {
    const cartItem: CartItem = {
      id: crypto.randomUUID(),
      menuItemId: item.id,
      name: item.name,
      size: selectedSize.label,
      extras: selectedExtras.map((e) => e.label),
      quantity,
      unitPrice,
      notes,
    };
    onConfirm(cartItem);
    onClose();
  }

  return (
    <div className="item-modal__backdrop" onClick={onClose}>
      <div className="item-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="item-modal__close" aria-label="Close">
          <X size={20} />
        </button>

        <h2 className="item-modal__title">{item.name}</h2>
        <p className="item-modal__description">{item.description}</p>

        <div className="item-modal__section">
          <h3 className="item-modal__section-title">Size</h3>
          {sizeOptions.map((size) => (
            <label key={size.id} className="item-modal__option">
              <input
                type="radio"
                name="size"
                checked={selectedSizeId === size.id}
                onChange={() => setSelectedSizeId(size.id)}
              />
              {size.label} {size.priceModifier > 0 && `(+$${size.priceModifier.toFixed(2)})`}
            </label>
          ))}
        </div>

        <div className="item-modal__section">
          <h3 className="item-modal__section-title">Extras</h3>
          {extraOptions.map((extra) => (
            <label key={extra.id} className="item-modal__option">
              <input
                type="checkbox"
                checked={selectedExtraIds.includes(extra.id)}
                onChange={() => toggleExtra(extra.id)}
              />
              {extra.label} {extra.priceModifier > 0 && `(+$${extra.priceModifier.toFixed(2)})`}
            </label>
          ))}
        </div>

        <div className="item-modal__section">
          <h3 className="item-modal__section-title">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special requests?"
            className="item-modal__notes"
          />
        </div>

        <div className="item-modal__quantity">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            <Minus size={16} />
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
            <Plus size={16} />
          </button>
        </div>

        <button onClick={handleConfirm} className="item-modal__confirm">
          Add {quantity} to Cart — ${(unitPrice * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
}