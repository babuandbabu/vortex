import React from 'react';
import { Search } from 'lucide-react';

export default function FilterBar({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  onSearchChange 
}) {
  return (
    <div className="filter-section">
      <div className="search-wrapper">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search events by name..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}