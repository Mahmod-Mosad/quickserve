import { useState } from 'react';
import Navbar from '../../components/Navbar';
import CartItemRow from '../../components/CartItemRow';
import AddressForm from '../../components/AddressForm';
import PaymentMethodSelector, { type PaymentMethod } from '../../components/PaymentMethodSelector';
import CardDetailsForm, { type CardDetails } from '../../components/CardDetailsForm';
import WalletDetailsForm, { type WalletDetails } from '../../components/WalletDetailsForm';
import OrderSummary from '../../components/OrderSummary';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import type { Address } from '../../types/address';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();

  const [address, setAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardDetails, setCardDetails] = useState<CardDetails | null>(null);
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(null);

  const canPlaceOrder = items.length > 0 && !!address?.area && !!address?.street;

  function handlePlaceOrder() {
    console.log('Placing order:', {
      items,
      address,
      paymentMethod,
      cardDetails,
      walletDetails,
      total: totalPrice,
    });
    clearCart();
  }

  return (
    <div className="checkout-page">
      <Navbar />

      <div className="checkout-page__content">
        <h1 className="checkout-page__title">{t('checkout.title')}</h1>

        <div className="checkout-page__layout">
          <div className="checkout-page__main">
            <section className="checkout-page__section">
              <h2 className="checkout-page__section-title">{t('checkout.yourOrder')}</h2>
              {items.length === 0 ? (
                <p className="checkout-page__empty">{t('checkout.emptyCart')}</p>
              ) : (
                items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onIncrease={(id) => updateQuantity(id, item.quantity + 1)}
                    onDecrease={(id) => updateQuantity(id, item.quantity - 1)}
                    onRemove={removeItem}
                  />
                ))
              )}
            </section>

            <section className="checkout-page__section">
              <h2 className="checkout-page__section-title">{t('checkout.deliveryAddress')}</h2>
              <AddressForm onChange={setAddress} />
            </section>
          </div>

          <div className="checkout-page__side">
            <section className="checkout-page__section">
              <h2 className="checkout-page__section-title">{t('checkout.paymentMethod')}</h2>
              <PaymentMethodSelector selected={paymentMethod} onChange={setPaymentMethod} />
              {paymentMethod === 'card' && <CardDetailsForm onChange={setCardDetails} />}
              {paymentMethod === 'wallet' && <WalletDetailsForm onChange={setWalletDetails} />}
            </section>

            <OrderSummary subtotal={totalPrice} />

            <button
              onClick={handlePlaceOrder}
              disabled={!canPlaceOrder}
              className="checkout-page__place-order"
            >
              {t('checkout.placeOrder')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}