import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import Navbar from '../../components/Navbar/Navbar';
import { User, Mail, Phone, Calendar, Check } from 'lucide-react';
import './Account.css';

const MyInformation = () => {
  const { user, setUser } = useProfile();
  const [formData, setFormData] = useState({ ...user });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); 
  };

  return (
    <div className="account-layout">
      <Navbar />
      <div className="account-page-container">
        <div className="white-card info-card">
          <h2 className="page-title">My Information</h2>
          <p className="page-subtitle">Manage your personal details and account settings</p>

          <form onSubmit={handleSubmit} className="info-form">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  value={`${formData.firstName} ${formData.lastName}`.trim()}
                  onChange={(e) => {
                    const parts = e.target.value.split(' ');
                    const first = parts[0] || '';
                    const last = parts.slice(1).join(' ');
                    setFormData({...formData, firstName: first, lastName: last});
                  }}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+90 5XX XXX XX XX"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Birth Date</label>
                <div className="input-wrapper">
                  <Calendar size={18} className="input-icon" />
                  <input 
                    type="date" 
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className={`save-info-btn ${isSaved ? 'saved' : ''}`}>
              {isSaved ? (
                <><Check size={20} /> Changes Saved</>
              ) : (
                'Update Information'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyInformation;