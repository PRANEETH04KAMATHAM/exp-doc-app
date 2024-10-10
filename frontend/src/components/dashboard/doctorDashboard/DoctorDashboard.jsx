import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch doctor data');
        const data = await response.json();
        setDoctorData(data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    if (user) fetchDoctorData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="doctor-dashboard">
      <header className="dashboard-header">
        <div className="hamburger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <h1>Doctor Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <div className="dashboard-content">
        <aside className={`dashboard-sidebar ${isMenuOpen ? 'open' : ''}`}>
          <nav>
            <ul>
              <li>
                <Link 
                  to="/doctor-dashboard/profile" 
                  className={location.pathname.includes('/profile') ? 'active' : ''}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/doctor-dashboard/appointments" 
                  className={location.pathname.includes('/appointments') ? 'active' : ''}
                >
                  Appointments
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="dashboard-main">
          <Outlet context={{ doctorData }} />
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;