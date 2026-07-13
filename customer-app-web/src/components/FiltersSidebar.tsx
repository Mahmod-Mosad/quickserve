import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './FiltersSidebar.css';

export default function FiltersSidebar() {
  const [openNow, setOpenNow] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const { t } = useLanguage();

  function logFilters() {
    console.log({ openNow, freeDelivery, topRated, minPrice, maxPrice });
  }

  return (
    <aside className="filters-sidebar">
      <h3 className="filters-sidebar__title">{t('home.filters.title')}</h3>

      <label className="filters-sidebar__checkbox">
        <input
          type="checkbox"
          checked={openNow}
          onChange={(e) => {
            setOpenNow(e.target.checked);
            logFilters();
          }}
        />
        {t('home.filters.openNow')}
      </label>

      <label className="filters-sidebar__checkbox">
        <input
          type="checkbox"
          checked={freeDelivery}
          onChange={(e) => {
            setFreeDelivery(e.target.checked);
            logFilters();
          }}
        />
        {t('home.filters.freeDelivery')}
      </label>

      <label className="filters-sidebar__checkbox">
        <input
          type="checkbox"
          checked={topRated}
          onChange={(e) => {
            setTopRated(e.target.checked);
            logFilters();
          }}
        />
        {t('home.filters.topRated')}
      </label>

      <div className="filters-sidebar__price">
        <span className="filters-sidebar__label">{t('home.filters.priceRange')}</span>
        <div className="filters-sidebar__price-inputs">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder={t('home.filters.min')}
            className="filters-sidebar__price-input"
          />
          <span>—</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder={t('home.filters.max')}
            className="filters-sidebar__price-input"
          />
        </div>
      </div>
    </aside>
  );
}