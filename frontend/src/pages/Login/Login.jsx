import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthToggle from '../../components/Auth/AuthToggle';
import './Login.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (activeTab === 'user') {
      navigate('/home');
    } else {
      navigate('/manager');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Sign In</h1>
          <p>Access your account to continue</p>
        </div>

        <AuthToggle activeTab={activeTab} setActiveTab={setActiveTab} />

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder={activeTab === 'user' ? "user@email.com" : "manager@restaurant.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input 
                type="password" 
                placeholder="........" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/register" className="signup-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;