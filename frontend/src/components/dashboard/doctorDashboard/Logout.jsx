import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import './Logout.css';

const Logout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="logout">
      <div className="logout-info">
        <img src={user.profileImage || "/path/to/default-image.jpg"} alt="Profile" className="profile-image" />
        <div className="user-details">
          <p className="username">{user.name}</p>
          <p className="user-role">{user.userType === 'doctor' ? user.specialization : 'Patient'}</p>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-button">
        <i className="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
  );
};

export default Logout;