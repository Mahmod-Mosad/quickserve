import { useState } from 'react';
import './FiltersSidebar.css';

export default function FiltersSidebar() {
  const [openNow, setOpenNow] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  function logFilters() {
    console.log({ openNow, freeDelivery, topRated, minPrice, maxPrice });
  }

  return (
    <aside className="filters-sidebar">
      <h3 className="filters-sidebar__title">Filters</h3>

      <label className="filters-sidebar__checkbox">
        <input
          type="checkbox"
          checked={openNow}
          onChange={(e) => {
            setOpenNow(e.target.checked);
            logFilters();
          }}
        />
        Open Now
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
        Free Delivery
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
        Top Rated
      </label>

      <div className="filters-sidebar__price">
        <span className="filters-sidebar__label">Price Range</span>
        <div className="filters-sidebar__price-inputs">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="filters-sidebar__price-input"
          />
          <span>—</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="filters-sidebar__price-input"
          />
        </div>
      </div>
    </aside>
  );
}