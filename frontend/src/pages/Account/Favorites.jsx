import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import Navbar from '../../components/Navbar/Navbar';
import { Trash2, Utensils } from 'lucide-react';
import './Account.css';

const Favorites = () => {
  const { favorites, toggleFavorite } = useProfile();

  return (
    <div className="account-layout">
      <Navbar />
      <div className="account-page-container">
        <div className="white-card">
          <div className="card-header">
            <h2 className="page-title">Favorite Restaurants</h2>
          </div>

          <div className="address-list-container">
            {favorites.length === 0 ? (
              <div className="empty-state">You haven't added any favorites yet.</div>
            ) : (
              favorites.map((res) => (
                <div key={res.id} className="address-card-item">
                  <div className="address-info-left">
                    <div className="icon-box"><Utensils size={18} color="#8b1a1a" /></div>
                    <div className="text-box">
                      <span className="addr-name">{res.name}</span>
                    </div>
                  </div>
                  <div className="address-actions-right">
                    <button 
                      className="btn-icon delete-red" 
                      onClick={() => toggleFavorite(res)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;