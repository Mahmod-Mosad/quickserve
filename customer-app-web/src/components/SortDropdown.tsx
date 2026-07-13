import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './SortDropdown.css';

const sortKeys = ['recommended', 'topRated', 'fastestDelivery', 'priceLowToHigh'];

export default function SortDropdown() {
  const [selected, setSelected] = useState(sortKeys[0]);
  const { t } = useLanguage();

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
      {sortKeys.map((key) => (
        <option key={key} value={key}>
          {t('home.sort.prefix')}: {t(`home.sort.${key}`)}
        </option>
      ))}
    </select>
  );
}