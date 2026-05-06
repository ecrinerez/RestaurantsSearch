import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Save, Check } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import '../Account/Account.css';

const ManagerInformation = () => {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 555 123 4567",
    birthDate: "01.01.1990"
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="account-layout">
      <Navbar isManager={true} />
      <div className="account-page-container">
        <div className="white-card info-card">
          <h2 className="page-title">My Information</h2>
          <p className="page-subtitle">Manage your personal details and account settings</p>
          
          <form className="info-form" onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" size={20} />
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Birth Date</label>
                <div className="input-wrapper">
                  <Calendar className="input-icon" size={20} />
                  <input 
                    type="text" 
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className={`save-info-btn ${isSaved ? 'saved' : ''}`}>
              {isSaved ? (
                <>
                  <Check size={20} />
                  Changes Saved
                </>
              ) : (
                <>
                  <Save size={20} />
                  Update Information
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagerInformation;