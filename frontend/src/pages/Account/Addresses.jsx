import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import Navbar from '../../components/Navbar/Navbar';
import { DISTRICT_CENTERS } from '../../data/mockRestaurants';
import { Plus, MapPin, Pencil, Trash2, X, CheckCircle2 } from 'lucide-react';
import './Account.css';

const Addresses = () => {
  const { addresses, addAddress, deleteAddress, activeAddress, setActiveAddress } = useProfile();
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({ title: '', province: '', district: '' });

  const districtList = Object.keys(DISTRICT_CENTERS);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAddress.province || !newAddress.district) return;

    const finalAddr = {
      ...newAddress,
      address: `${newAddress.province}, ${newAddress.district}`
    };
    addAddress(finalAddr);
    setShowModal(false);
    setNewAddress({ title: '', province: '', district: '' });
  };

  return (
    <div className="account-layout">
      <Navbar />
      <div className="account-page-container">
        <div className="white-card">
          <div className="card-header">
            <h2 className="page-title">My Addresses</h2>
            <button className="primary-add-btn" onClick={() => setShowModal(true)}>
              <Plus size={18} /> Add New Address
            </button>
          </div>

          <div className="address-list-container">
            {addresses.length === 0 ? (
              <div className="empty-state">No addresses saved yet.</div>
            ) : (
              addresses.map((addr) => (
                <div 
                  key={addr.id} 
                  className={`address-card-item ${activeAddress?.id === addr.id ? 'active-card' : ''}`}
                  onClick={() => setActiveAddress(addr)}
                >
                  <div className="address-info-left">
                    <div className="icon-box">
                      {activeAddress?.id === addr.id ? (
                        <CheckCircle2 size={20} color="#27ae60" />
                      ) : (
                        <MapPin size={18} color="#8b1a1a" />
                      )}
                    </div>
                    <div className="text-box">
                      <div className="title-row">
                        <span className="addr-name">{addr.title}</span>
                      </div>
                      <p className="addr-text">{addr.address}</p>
                    </div>
                  </div>
                  <div className="address-actions-right">
                    <button 
                      className="btn-icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      className="btn-icon delete-red" 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAddress(addr.id);
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {showModal && (
          <div className="modal-bg">
            <div className="modal-content">
              <div className="modal-top">
                <h3>Add New Address</h3>
                <X className="modal-close" onClick={() => setShowModal(false)} />
              </div>
              <form className="modal-form" onSubmit={handleAdd}>
                <input 
                  type="text"
                  placeholder="Address Title (e.g. Mom's House)" 
                  value={newAddress.title}
                  onChange={(e) => setNewAddress({...newAddress, title: e.target.value})}
                  required 
                  className="modal-input"
                />
                
                <div className="select-row">
                  <select 
                    className="small-select" 
                    value={newAddress.province}
                    onChange={(e) => setNewAddress({...newAddress, province: e.target.value})}
                    required
                  >
                    <option value="" disabled>İl</option>
                    <option value="İstanbul">İstanbul</option>
                  </select>

                  <select 
                    className="small-select"
                    value={newAddress.district}
                    onChange={(e) => setNewAddress({...newAddress, district: e.target.value})}
                    required
                  >
                    <option value="" disabled>İlçe</option>
                    {districtList.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
                
                <button type="submit" className="modal-save-btn">Save Address</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Addresses;