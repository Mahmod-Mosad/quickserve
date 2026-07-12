import { Search } from 'lucide-react';
import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(value: string) {
    setSearchTerm(value);
    console.log('Search term:', value);
  }

  return (
    <div className="search-bar">
      <Search size={18} className="search-bar__icon" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search for restaurants, cuisines, or dishes"
        className="search-bar__input"
      />
    </div>
  );
}