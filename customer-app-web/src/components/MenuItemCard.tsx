import { Plus } from 'lucide-react';
import type { MenuItem } from '../types/menuItem';
import { useLanguage } from '../context/LanguageContext';
import './MenuItemCard.css';

interface MenuItemCardProps {
  item: MenuItem;
  onAddClick: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onAddClick }: MenuItemCardProps) {
  const { t } = useLanguage();

  return (
    <div className="menu-item-card">
      <div className="menu-item-card__image-wrapper">
        <img src={item.imageUrl} alt="" className="menu-item-card__image" />
        {item.badge === 'Vegan' && (
          <span className="menu-item-card__badge">{t('vendorMenu.veganBadge')}</span>
        )}
      </div>

      <div className="menu-item-card__info">
        <h3 className="menu-item-card__name">{item.name}</h3>
        <p className="menu-item-card__description">{item.description}</p>

        <div className="menu-item-card__footer">
          <span className="menu-item-card__price">${item.price.toFixed(2)}</span>
          <button
            onClick={() => onAddClick(item)}
            className="menu-item-card__add-button"
            aria-label={`Add ${item.name}`}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}