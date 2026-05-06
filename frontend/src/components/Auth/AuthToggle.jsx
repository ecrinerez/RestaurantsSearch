import React from 'react';
import './AuthToggle.css';

const AuthToggle = ({ activeTab, setActiveTab }) => {
  return (
    <div className="auth-toggle-container">
      <button 
        className={`toggle-btn ${activeTab === 'user' ? 'active' : ''}`}
        onClick={() => setActiveTab('user')}
        type="button"
      >
        <span className="icon">👤</span> User
      </button>
      <button 
        className={`toggle-btn ${activeTab === 'manager' ? 'active' : ''}`}
        onClick={() => setActiveTab('manager')}
        type="button"
      >
        <span className="icon">💼</span> Manager
      </button>
    </div>
  );
};

export default AuthToggle;