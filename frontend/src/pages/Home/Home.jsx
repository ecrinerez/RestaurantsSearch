import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import { MOCK_RESTAURANTS, DISTRICT_CENTERS } from '../../data/mockRestaurants';
import { useProfile } from '../../context/ProfileContext';
import './Home.css';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const Home = () => {
  const { activeAddress } = useProfile();
  const [filteredList, setFilteredList] = useState([]);
  const [filters, setFilters] = useState({
    sort: 'Recommended',
    cuisines: ['All'],
    rating: 'All',
    distance: 'All',
    time: 'All',
    search: ''
  });

  const processedRestaurants = useMemo(() => {
    const userPos = DISTRICT_CENTERS[activeAddress?.district] || DISTRICT_CENTERS["Beşiktaş"];
    return MOCK_RESTAURANTS.map(res => {
      const dist = calculateDistance(userPos.lat, userPos.lng, res.lat, res.lng);
      return { 
        ...res, 
        distance: dist.toFixed(1), 
       carTime: Math.max(1, Math.floor(dist * 2)), 
        walkingTime: Math.max(1, Math.floor(dist * 12))
      };
    });
  }, [activeAddress]);

  useEffect(() => {
    let result = [...processedRestaurants];

    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(res => res.name.toLowerCase().includes(s) || res.cuisines.some(c => c.toLowerCase().includes(s)));
    }

    if (!filters.cuisines.includes('All')) {
      result = result.filter(res =>
        res.cuisines.some(c => filters.cuisines.includes(c))
      );
    }

    if (filters.rating !== 'All') {
      result = result.filter(res => parseFloat(res.rating) >= parseFloat(filters.rating));
    }

    if (filters.distance !== 'All') {
      result = result.filter(res => parseFloat(res.distance) <= parseFloat(filters.distance));
    }

    if (filters.time !== 'All') {
      result = result.filter(res => res.carTime <= parseInt(filters.time));
    }

    result.sort((a, b) => {
      if (activeAddress) {
        const aInDistrict = a.district === activeAddress.district;
        const bInDistrict = b.district === activeAddress.district;

        if (aInDistrict && !bInDistrict) return -1;
        if (!aInDistrict && bInDistrict) return 1;
      }
      
      if (filters.sort === 'Alphabetical') {
        return a.name.localeCompare(b.name);
      } else if (filters.sort === 'By Rating') {
        return b.rating - a.rating;
      } else if (filters.sort === 'By Distance') {
        return a.distance - b.distance;
      }
      return 0;
    });

    setFilteredList(result);
  }, [filters, processedRestaurants, activeAddress]);

  return (
    <div className="home-page">
      <Navbar onSearch={(val) => setFilters({ ...filters, search: val })} />
      <div className="home-layout">
        <Sidebar currentFilters={filters} onFilterChange={setFilters} />
        <main className="main-content">
          <div className="restaurant-grid">
            {filteredList.length === 0 ? (
              <p>Uygun restoran bulunamadı.</p>
            ) : (
              filteredList.map(res => (
                <RestaurantCard key={res.id} data={res} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;