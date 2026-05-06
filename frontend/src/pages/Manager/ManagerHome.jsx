import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import ManagerRestaurantCard from '../../components/Manager/ManagerRestaurantCard';
import AddEditModal from '../../components/Manager/AddEditModal';
import DeleteModal from '../../components/Manager/DeleteModal';
import { useRestaurants } from '../../context/RestaurantContext';
import './ManagerHome.css';

const ManagerHome = () => {
  const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant } = useRestaurants();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRes, setSelectedRes] = useState(null);

  const filtered = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (formData) => {
    if (selectedRes) {
      updateRestaurant(selectedRes.id, formData);
    } else {
      addRestaurant(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    deleteRestaurant(selectedRes.id);
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