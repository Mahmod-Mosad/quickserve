import { ShoppingCart, Globe } from 'lucide-react';import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

interface NavbarProps {
  activeLink?: 'home' | 'search' | 'orders';
}

export default function Navbar({ activeLink = 'home' }: NavbarProps) {
  const navigate = useNavigate();
  const { t, toggleLanguage, language } = useLanguage();

  function handleCartClick() {
    navigate('/checkout');
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <span className="navbar__logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          QuickServe
        </span>

        <div className="navbar__links">
          <button
            onClick={() => navigate('/')}
            className={`navbar__link ${activeLink === 'home' ? 'navbar__link--active' : ''}`}
          >
            {t('navbar.home')}
          </button>
          <button
            onClick={() => console.log('Search page not built yet')}
            className={`navbar__link ${activeLink === 'search' ? 'navbar__link--active' : ''}`}
          >
            {t('navbar.search')}
          </button>
          <button
            onClick={() => console.log('Orders page not built yet')}
            className={`navbar__link ${activeLink === 'orders' ? 'navbar__link--active' : ''}`}
          >
            {t('navbar.orders')}
          </button>
        </div>
      </div>

      <div className="navbar__right">
        <button onClick={toggleLanguage} className="navbar__cart" aria-label="Toggle language">
         <Globe size={20} />
          <span className="navbar__lang-label">{language === 'en' ? 'AR' : 'EN'}</span>
        </button>
        <ThemeToggle />
        <button onClick={handleCartClick} className="navbar__cart" aria-label="Cart">
          <ShoppingCart size={20} />
        </button>
      </div>
    </nav>
  );
}