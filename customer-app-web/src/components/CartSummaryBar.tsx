import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import './CartSummaryBar.css';

export default function CartSummaryBar() {
  const { totalCount, totalPrice } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (totalCount === 0) return null;

  return (
    <div className="cart-summary-bar">
      <span className="cart-summary-bar__info">
        {totalCount} {totalCount === 1 ? t('vendorMenu.cartItem') : t('vendorMenu.cartItems')} — $
        {totalPrice.toFixed(2)}
      </span>
      <button onClick={() => navigate('/checkout')} className="cart-summary-bar__button">
        <ShoppingBag size={16} />
        {t('vendorMenu.viewCart')}
      </button>
    </div>
  );
}