import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import VendorConflictModal from './components/VendorConflictModal';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import VendorMenuPage from './pages/VendorMenu/VendorMenuPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';

function App() {
  return (
    <CartProvider>
      <VendorConflictModal />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/vendor/:vendorId" element={<VendorMenuPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;