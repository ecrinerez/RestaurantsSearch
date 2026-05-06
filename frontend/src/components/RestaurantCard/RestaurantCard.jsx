import React from 'react';
import { Heart, Star, Car, Footprints, MapPin } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import './RestaurantCard.css';

const RestaurantCard = ({ data }) => {
  const { favorites, toggleFavorite } = useProfile();
  const isFavorite = favorites.some(f => f.id === data.id);
  const displayCuisine = data.cuisine || (Array.isArray(data.cuisines) ? data.cuisines.join(', ') : '');

  return (
    <div className="restaurant-item-card">
      <div className="image-box">
        <img src={data.image} alt={data.name} />
        <button 
          className={`fav-button ${isFavorite ? 'active' : ''}`}
          onClick={() => toggleFavorite(data)}
        >
          <Heart 
            size={18} 
            fill={isFavorite ? "#801818" : "none"} 
            color={isFavorite ? "#801818" : "black"} 
            strokeWidth={2.5}
          />
        </button>
      </div>
      <div className="content-box">
        <div className="title-row">
          <h3>{data.name}</h3>
          <div className="rating-tag">
            <Star size={14} fill="#f1c40f" color="#f1c40f" />
            <span>{data.rating}</span>
          </div>
        </div>
        <p className="cuisine-list">{displayCuisine}</p>
        <div className="stats-row">
          <div className="stat-item">
            <Car size={14} />
            <span>{data.carTime} min</span>
          </div>
          <div className="stat-item">
            <Footprints size={14} />
            <span>{data.walkingTime} min</span>
          </div>
          <div className="stat-item">
            <MapPin size={14} />
            <span>{data.distance} km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;