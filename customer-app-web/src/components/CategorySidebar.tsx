import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './CategorySidebar.css';

const categoryKeys = ['popular', 'grainBowls', 'freshSalads', 'smoothiesDrinks', 'sidesSnacks'];

interface CategorySidebarProps {
  onSelect: (categoryKey: string) => void;
}

export default function CategorySidebar({ onSelect }: CategorySidebarProps) {
  const [selected, setSelected] = useState(categoryKeys[0]);
  const { t } = useLanguage();

  function handleClick(categoryKey: string) {
    setSelected(categoryKey);
    onSelect(categoryKey);
  }

  return (
    <nav className="category-sidebar">
      {categoryKeys.map((key) => (
        <button
          key={key}
          onClick={() => handleClick(key)}
          className={`category-sidebar__item ${
            selected === key ? 'category-sidebar__item--active' : ''
          }`}
        >
          {t(`vendorMenu.categories.${key}`)}
        </button>
      ))}
    </nav>
  );
}