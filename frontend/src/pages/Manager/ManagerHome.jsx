import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import ManagerRestaurantCard from '../../components/Manager/ManagerRestaurantCard';
import AddEditModal from '../../components/Manager/AddEditModal';
import DeleteModal from '../../components/Manager/DeleteModal';
import { useProfile } from '../../context/ProfileContext';
import './ManagerHome.css';

const ManagerHome = () => {
  const { user } = useProfile();
  
  const [restaurants, setRestaurants] = useState(() => {
    if (user?.id) {
      const savedRestaurants = localStorage.getItem(`tf_manager_restaurants_${user.id}`);
      if (savedRestaurants) {
        return JSON.parse(savedRestaurants);
      }
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRes, setSelectedRes] = useState(null);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`tf_manager_restaurants_${user.id}`, JSON.stringify(restaurants));
    }
  }, [restaurants, user]);

  const filtered = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (formData) => {
    if (selectedRes) {
      setRestaurants(prev => prev.map(r => r.id === selectedRes.id ? { ...formData, id: selectedRes.id } : r));
    } else {
      setRestaurants(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setRestaurants(prev => prev.filter(r => r.id !== selectedRes.id));
    setIsDeleteOpen(false);
  };

  return (
    <div className="manager-page">
      <Navbar isManager={true} />
      <div className="manager-main">
        <div className="manager-header-row">
          <div className="m-search-wrapper">
            <Search className="m-search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search restaurant..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-res-btn" onClick={() => { setSelectedRes(null); setIsModalOpen(true); }}>
            <Plus size={20} />
            Add Restaurant
          </button>
        </div>

        <div className="manager-grid">
          {filtered.length === 0 ? (
            <div className="empty-state">No restaurants found. Click "Add Restaurant" to start.</div>
          ) : (
            filtered.map(res => (
              <ManagerRestaurantCard 
                key={res.id} 
                data={res} 
                onEdit={() => { setSelectedRes(res); setIsModalOpen(true); }}
                onDelete={() => { setSelectedRes(res); setIsDeleteOpen(true); }}
              />
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddEditModal 
          data={selectedRes} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave}
        />
      )}

      {isDeleteOpen && (
        <DeleteModal 
          name={selectedRes?.name} 
          onClose={() => setIsDeleteOpen(false)} 
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ManagerHome;