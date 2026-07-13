import { Pizza, Hamburger, ShoppingBasket, Salad, Dessert, Coffee } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './CategoryIcons.css';

const categories = [
  { id: 'pizza', icon: Pizza },
  { id: 'burgers', icon: Hamburger },
  { id: 'groceries', icon: ShoppingBasket },
  { id: 'healthy', icon: Salad },
  { id: 'desserts', icon: Dessert },
  { id: 'coffee', icon: Coffee },
];

export default function CategoryIcons() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { t } = useLanguage();

  function handleClick(categoryId: string) {
    setSelectedCategory(categoryId);
    console.log('Selected category:', categoryId);
  }

  return (
    <div className="category-icons">
      {categories.map(({ id, icon: Icon }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={`category-icons__item ${selectedCategory === id ? 'category-icons__item--active' : ''}`}
        >
          <span className="category-icons__circle">
            <Icon size={22} />
          </span>
          <span className="category-icons__label">{t(`home.categories.${id}`)}</span>
        </button>
      ))}
    </div>
  );
}