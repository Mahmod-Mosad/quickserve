import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import './VendorConflictModal.css';

export default function VendorConflictModal() {
  const { pendingConflict, resolveConflict } = useCart();
  const { t } = useLanguage();

  if (!pendingConflict) return null;

  return (
    <div className="vendor-conflict-modal__backdrop">
      <div className="vendor-conflict-modal">
        <div className="vendor-conflict-modal__icon">
          <ShoppingCart size={20} />
        </div>

        <h3 className="vendor-conflict-modal__title">{t('checkout.conflictTitle')}</h3>
        <p className="vendor-conflict-modal__message">{t('checkout.conflictMessage')}</p>

        <div className="vendor-conflict-modal__actions">
          <button onClick={() => resolveConflict(false)} className="vendor-conflict-modal__cancel">
            {t('checkout.keepCart')}
          </button>
          <button onClick={() => resolveConflict(true)} className="vendor-conflict-modal__confirm">
            {t('checkout.clearCart')}
          </button>
        </div>
      </div>
    </div>
  );
}