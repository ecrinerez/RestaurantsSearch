import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DISTRICT_CENTERS } from '../../data/mockRestaurants';
import './Modals.css';

const CUISINES = [
  'Burger', 'Doner', 'Pizza', 'Pide & Lahmacun', 'Cig Kofte', 'Street Food', 
  'Dessert', 'Chicken', 'Home Cooking', 'Salad & Healthy', 'Meatball', 
  'Tantuni', 'Manti & Pasta', 'Kebab', 'Toast & Sandwich', 'Soup', 
  'Bakery & Pastry', 'Coffee & Beverages', 'Seafood', 'Far Eastern', 
  'World Cuisine', 'Appetizers', 'Borek', 'Steak', 'Ice Cream', 'Breakfast'
];

const AddEditModal = ({ data, onClose, onSave }) => {
  const districts = Object.keys(DISTRICT_CENTERS);
  
  const initialCuisine = data?.cuisine || (Array.isArray(data?.cuisines) ? data.cuisines[0] : "");
  const initialDistrict = data?.district || data?.address || "";

  const [formData, setFormData] = useState({
    name: data?.name || "",
    cuisines: initialCuisine ? [initialCuisine] : [],
    district: initialDistrict,
    image: data?.image || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || formData.cuisines.length === 0 || !formData.district) return;
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>{data ? 'Edit Restaurant' : 'Add Restaurant'}</h2>
          <X className="close-icon" onClick={onClose} />
        </div>
        
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Restaurant Name *</label>
            <input 
              type="text" 
              placeholder="Enter name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Cuisine Type *</label>
            <select 
              value={formData.cuisines[0] || ""} 
              onChange={(e) => setFormData({...formData, cuisines: [e.target.value]})}
            >
              <option value="" disabled>Select Cuisine</option>
              {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <select defaultValue="istanbul">
                <option value="istanbul">İstanbul</option>
              </select>
            </div>
            <div className="form-group">
              <label>District *</label>
              <select 
                value={formData.district} 
                onChange={(e) => setFormData({...formData, district: e.target.value})}
              >
                <option value="" disabled>Select District</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input type="text" placeholder="0555 000 00 00" />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input 
              type="text" 
              placeholder="https://..." 
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn m-btn-bordo">{data ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;