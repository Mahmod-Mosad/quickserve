import { useState } from 'react';
import './SortDropdown.css';

const sortOptions = ['Recommended', 'Top Rated', 'Fastest Delivery', 'Price: Low to High'];

export default function SortDropdown() {
  const [selected, setSelected] = useState(sortOptions[0]);

  function handleChange(value: string) {
    setSelected(value);
    console.log('Sort by:', value);
  }

  return (
    <select
      value={selected}
      onChange={(e) => handleChange(e.target.value)}
      className="sort-dropdown"
    >
      {sortOptions.map((option) => (
        <option key={option} value={option}>
          Sort By: {option}
        </option>
      ))}
    </select>
  );
}