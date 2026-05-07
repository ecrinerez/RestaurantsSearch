import React, { useState, useEffect } from 'react';
import { Heart, Star, Car, Footprints, MapPin } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import './RestaurantCard.css';

const RestaurantCard = ({ data }) => {
  const { user, favorites, toggleFavorite } = useProfile();
  
  const isFavorite = favorites.some(f => Number(f.id) === Number(data.id));
  const displayCuisine = data.cuisine || (Array.isArray(data.cuisines) ? data.cuisines.join(', ') : '');

  const [userRating, setUserRating] = useState(0);
  const [currentAvg, setCurrentAvg] = useState(Number(data.rating) || 4.2);
  const [voteCount, setVoteCount] = useState(10);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (!data.id) return;

    const savedAvg = localStorage.getItem(`tf_avg_rating_${data.id}`);
    const savedCount = localStorage.getItem(`tf_vote_count_${data.id}`);
    
    if (savedAvg) setCurrentAvg(Number(savedAvg));
    else setCurrentAvg(Number(data.rating) || 4.2);

    if (savedCount) setVoteCount(Number(savedCount));
    else setVoteCount(10);

    if (user?.id) {
      const savedUserRating = localStorage.getItem(`tf_user_rating_${user.id}_${data.id}`);
      setUserRating(savedUserRating ? Number(savedUserRating) : 0);
    } else {
      setUserRating(0);
    }
  }, [user?.id, data.id, data.rating]);

  const handleRate = (rateValue) => {
    if (!user?.id) return;

    let newVoteCount = voteCount;
    let newAverage = currentAvg;

    if (userRating === 0) {
      newVoteCount += 1;
      newAverage = ((currentAvg * voteCount) + rateValue) / newVoteCount;
    } else {
      newAverage = ((currentAvg * voteCount) - userRating + rateValue) / voteCount;
    }

    const finalAvg = Number(newAverage.toFixed(1));

    setCurrentAvg(finalAvg);
    setVoteCount(newVoteCount);
    setUserRating(rateValue);

    localStorage.setItem(`tf_user_rating_${user.id}_${data.id}`, rateValue.toString());
    localStorage.setItem(`tf_avg_rating_${data.id}`, finalAvg.toString());
    localStorage.setItem(`tf_vote_count_${data.id}`, newVoteCount.toString());
  };

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
            <span>{currentAvg}</span>
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
          
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center', marginLeft: 'auto' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRate(star)}
                fill={(hoverRating || userRating) >= star ? "#f1c40f" : "transparent"}
                color="#f1c40f"
                style={{ cursor: 'pointer', transition: '0.2s' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;