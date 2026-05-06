import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ currentFilters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cuisineList = [
    'Burger', 'Doner', 'Pizza', 'Pide & Lahmacun', 'Cig Kofte', 'Street Food', 
    'Dessert', 'Chicken', 'Home Cooking', 'Salad & Healthy', 'Meatball', 
    'Tantuni', 'Manti & Pasta', 'Kebab', 'Toast & Sandwich', 'Soup', 
    'Bakery & Pastry', 'Coffee & Beverages', 'Seafood', 'Far Eastern', 
    'World Cuisine', 'Appetizers', 'Borek', 'Steak', 'Ice Cream', 'Breakfast'
  ];

  const displayedCuisines = isExpanded ? cuisineList : cuisineList.slice(0, 10);

  return (
    <aside className="sidebar-filter">
      <button className="clear-btn" onClick={() => onFilterChange({
        sort: 'Recommended', cuisines: ['All'], rating: 'All', distance: 'All', maxTime: 'All', search: ''
      })}>
        Clear Filters
      </button>

      <div className="section">
        <h4>Sort By</h4>
        {['Recommended', 'Alphabetical', 'By Rating', 'By Distance'].map(opt => (
          <label key={opt} className="filter-item">
            <input type="radio" checked={currentFilters.sort === opt} onChange={() => onFilterChange({...currentFilters, sort: opt})} />
            <span>{opt}</span>
          </label>
        ))}
      </div>

      <div className="section">
        <h4>Cuisines</h4>
        <label className="filter-item">
          <input type="checkbox" checked={currentFilters.cuisines.includes('All')} onChange={() => onFilterChange({...currentFilters, cuisines: ['All']})} />
          <span>All</span>
        </label>
        {displayedCuisines.map(c => (
          <label key={c} className="filter-item">
            <input 
              type="checkbox" 
              checked={currentFilters.cuisines.includes(c)} 
              onChange={() => {
                const filtered = currentFilters.cuisines.filter(x => x !== 'All');
                const newC = filtered.includes(c) ? filtered.filter(x => x !== c) : [...filtered, c];
                onFilterChange({...currentFilters, cuisines: newC.length ? newC : ['All']});
              }} 
            />
            <span>{c}</span>
          </label>
        ))}
        <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Show Less ↑' : 'Show More ↓'}
        </button>
      </div>

      <div className="section">
        <h4>Average Rating</h4>
        {['All', '4.5 and Above', '4.0 and Above', '3.0 and Above'].map(r => (
          <label key={r} className="filter-item">
            <input type="radio" checked={currentFilters.rating === r} onChange={() => onFilterChange({...currentFilters, rating: r})} />
            <span>{r}</span>
          </label>
        ))}
      </div>

      <div className="section">
        <h4>Distance</h4>
        {['All', '5 km', '10 km', '20 km', '40 km'].map(d => (
          <label key={d} className="filter-item">
            <input type="radio" checked={currentFilters.distance === d} onChange={() => onFilterChange({...currentFilters, distance: d})} />
            <span>{d === 'All' ? 'All' : `${d} and below`}</span>
          </label>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;