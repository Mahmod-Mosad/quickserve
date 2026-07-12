import { useState } from 'react';
import './CategorySidebar.css';

const categories = ['Popular', 'Grain Bowls', 'Fresh Salads', 'Smoothies & Drinks', 'Sides & Snacks'];

interface CategorySidebarProps {
  onSelect: (category: string) => void;
}

export default function CategorySidebar({ onSelect }: CategorySidebarProps) {
  const [selected, setSelected] = useState(categories[0]);

  function handleClick(category: string) {
    setSelected(category);
    onSelect(category);
  }

  return (
    <nav className="category-sidebar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`category-sidebar__item ${
            selected === category ? 'category-sidebar__item--active' : ''
          }`}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}