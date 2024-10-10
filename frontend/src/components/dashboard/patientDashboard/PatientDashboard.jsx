import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import Logout from '../doctorDashboard/Logout';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!user || !user.token) {
        console.error('User or token not found');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/patients/profile`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch patient data');
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    if (user) fetchPatientData();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="patient-dashboard">
      <header className="dashboard-header">
        <div className="hamburger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <h1>Patient Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <div className="dashboard-content">
        <aside className={`dashboard-sidebar ${isMenuOpen ? 'open' : ''}`}>
          <nav>
            <ul>
              <li>
                <Link 
                  to="/patient-dashboard/profile" 
                  className={location.pathname.includes('/profile') ? 'active' : ''}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/patient-dashboard/appointments" 
                  className={location.pathname.includes('/appointments') ? 'active' : ''}
                >
                  Appointments
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="dashboard-main">
          <Outlet context={{ patientData }} />
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;