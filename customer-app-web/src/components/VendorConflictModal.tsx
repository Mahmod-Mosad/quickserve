import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './VendorConflictModal.css';

export default function VendorConflictModal() {
  const { pendingConflict, resolveConflict } = useCart();

  if (!pendingConflict) return null;

  return (
    <div className="vendor-conflict-modal__backdrop">
      <div className="vendor-conflict-modal">
        <div className="vendor-conflict-modal__icon">
          <ShoppingCart size={20} />
        </div>

        <h3 className="vendor-conflict-modal__title">Start a new order?</h3>
        <p className="vendor-conflict-modal__message">
          Your cart has items from another restaurant. Adding this item will clear your current cart.
        </p>

        <div className="vendor-conflict-modal__actions">
          <button onClick={() => resolveConflict(false)} className="vendor-conflict-modal__cancel">
            Keep cart
          </button>
          <button onClick={() => resolveConflict(true)} className="vendor-conflict-modal__confirm">
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}