import { Pizza, Hamburger, ShoppingBasket, Salad, Dessert, Coffee } from 'lucide-react';
import { useState } from 'react';
import './CategoryIcons.css';

const categories = [
  { id: 'pizza', label: 'Pizza', icon: Pizza },
  { id: 'burgers', label: 'Burgers', icon: Hamburger },
  { id: 'groceries', label: 'Groceries', icon: ShoppingBasket },
  { id: 'healthy', label: 'Healthy', icon: Salad },
  { id: 'desserts', label: 'Desserts', icon: Dessert },
  { id: 'coffee', label: 'Coffee', icon: Coffee },
];

export default function CategoryIcons() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function handleClick(categoryId: string) {
    setSelectedCategory(categoryId);
    console.log('Selected category:', categoryId);
  }

  return (
    <div className="category-icons">
      {categories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={`category-icons__item ${selectedCategory === id ? 'category-icons__item--active' : ''}`}
        >
          <span className="category-icons__circle">
            <Icon size={22} />
          </span>
          <span className="category-icons__label">{label}</span>
        </button>
      ))}
    </div>
  );
}