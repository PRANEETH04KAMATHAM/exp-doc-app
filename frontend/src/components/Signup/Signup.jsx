import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import '../login/Login.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    age: '',
    gender: '',
    address: '',
    specialization: '',
    hospitalName: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Submitting form data:', formData);
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key !== 'confirmPassword') {
          formDataToSend.append(key, formData[key]);
          console.log(`Appending ${key}:`, formData[key]);
        }
      }
      if (profileImage) {
        formDataToSend.append('profileImage', profileImage);
        console.log('Appending profileImage:', profileImage);
      }
      
      const registrationData = await register(formDataToSend, formData.role);
      console.log('Registration successful:', registrationData);

      // Log the user in automatically after successful registration
      await login(formData.email, formData.password, formData.role);

      // Navigate based on user role
      if (formData.role === 'patient') {
        navigate('/patient-dashboard');
      } else if (formData.role === 'doctor') {
        navigate('/doctor-dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="whole">
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-heading">Register</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label>Register as</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          {formData.role === 'doctor' && (
            <>
              <div className="form-group">
                <label>Specialization</label>
                <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Hospital Name</label>
                <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} required />
              </div>
            </>
          )}
          {formData.role === 'patient' && (
            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
          )}
          <button type="submit" className="btn auth-btn">Register</button>
          <p>
            Already have an account? <Link to="/login" className="auth-link">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;