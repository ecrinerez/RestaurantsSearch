import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, User, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onSearch, isManager = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="main-navbar">
      <div className="nav-left-section">
        <div className="nav-logo">
          <Link to={isManager ? "/manager" : "/"} className="logo-link">
            Taste <span>Finder</span>
          </Link>
        </div>
      </div>

      {!isManager && (
        <div className="nav-search">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search for food, cuisine or restaurant" 
            onChange={(e) => onSearch(e.target.value)} 
          />
        </div>
      )}

      <div className="nav-links">
        {!isManager && (
          <Link to="/favorites" className="favorites-link" style={{ textDecoration: 'none' }}>
            <Heart size={20} />
            <span>Favorite Restaurants</span>
          </Link>
        )}

        <div className="user-menu-container">
          <button className="user-menu-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <User size={20} />
            <span>My Account</span>
            <ChevronDown size={16} />
          </button>

          {isDropdownOpen && (
            <div className="user-dropdown">
              {!isManager && (
                <Link to="/account/addresses" className="dropdown-option" onClick={() => setIsDropdownOpen(false)}>
                  Addresses
                </Link>
              )}
              <Link 
                to={isManager ? "/manager/information" : "/account/information"} 
                className="dropdown-option" 
                onClick={() => setIsDropdownOpen(false)}
              >
                My Information
              </Link>
              <hr />
              <button className="dropdown-option logout-option" onClick={() => setIsDropdownOpen(false)}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;