import React from 'react';
import { Star, Pencil, Trash2, MapPin } from 'lucide-react';
import './ManagerRestaurantCard.css';

const ManagerRestaurantCard = ({ data, onEdit, onDelete }) => {
  const cleanName = data?.name ? data.name.split(' (')[0] : '';
  const displayCuisine = data.cuisine || (Array.isArray(data.cuisines) ? data.cuisines.join(', ') : '');
  
  const locationText = data.address && data.city 
    ? `${data.address}, ${data.city}` 
    : (data.address || data.city || '');

  return (
    <div className="m-res-card">
      <div className="m-card-img">
        <img src={data.image || "https://via.placeholder.com/400x200?text=No+Image"} alt={cleanName} />
      </div>
      <div className="m-card-content">
        <div className="m-card-header">
          <h3>{cleanName}</h3>
          <div className="m-card-rating">
            <Star size={14} fill="#f1c40f" color="#f1c40f" />
            <span>{data.rating}</span>
          </div>
        </div>
        <p className="m-card-cuisine">{displayCuisine}</p>
        
        {locationText && (
          <div className="m-card-location">
            <MapPin size={14} />
            <span>{locationText}</span>
          </div>
        )}

        <div className="m-card-actions">
          <button className="m-btn-edit" onClick={onEdit}>
            <Pencil size={16} /> Edit
          </button>
          <button className="m-btn-delete" onClick={onDelete}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerRestaurantCard;