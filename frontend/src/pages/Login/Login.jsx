import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthToggle from '../../components/Auth/AuthToggle';
import { useProfile } from '../../context/ProfileContext';
import { loginUser } from '../../services/api';
import './Login.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, clearSession } = useProfile();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    console.log("Sending API Request... Email:", email);

    try {
      const data = await loginUser(email, password);
      
      clearSession();
      
      console.log("Login Successful! Received Data:", data);
      
      const incomingName = data.fullName || data.FullName || "User Name";
      const nameParts = incomingName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');

      setUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        id: data.userId || data.UserId,
        role: data.userRole || data.UserRole
      });

      if ((data.userRole || data.UserRole) === 'Manager') {
        navigate('/manager');
      } else {
        navigate('/home');
      }

    } catch (err) {
      console.error("Login Denied! Reason:", err.message);
      setError("Invalid email or password.");
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
        
        {error && (
          <div className="error-message" style={{backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #ffcdd2', fontSize: '14px', textAlign: 'center'}}>
            {error}
          </div>
        )}
        
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