import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthToggle from '../../components/Auth/AuthToggle';
import { registerUser } from '../../services/api';
import './Register.css';

const Register = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    restaurantName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      passwordHash: formData.password,
      role: activeTab === 'user' ? 0 : 1,
      restaurantName: activeTab === 'manager' ? formData.restaurantName : null
    };

    try {
      await registerUser(payload);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h1>Create Account</h1>
        </div>
        <AuthToggle activeTab={activeTab} setActiveTab={setActiveTab} />
        {error && <div className="error-message" style={{color: 'red', marginBottom: '10px', fontSize: '14px'}}>{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>{activeTab === 'user' ? 'Full Name' : 'Authorized Full Name'}</label>
            <input 
              type="text" 
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required 
            />
          </div>
          {activeTab === 'manager' && (
            <div className="form-group">
              <label>Restaurant Name</label>
              <input 
                type="text" 
                placeholder="Your restaurant's name"
                value={formData.restaurantName}
                onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                required 
              />
            </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="........" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="........" 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required 
            />
          </div>
          <button type="submit" className="register-submit-btn">
            {activeTab === 'user' ? 'Create Account' : 'Create Manager Account'}
          </button>
        </form>
        <div className="register-footer">
          Already have an account? <Link to="/" className="signin-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;