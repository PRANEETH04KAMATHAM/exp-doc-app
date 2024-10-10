import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-box">
          <h1 className="about-heading">About Online Doctor Appointment</h1>
          <ul className="feature-list">
            <li className="feature-item">
              <strong>Easy Scheduling:</strong> Book appointments with just a few clicks. Our intuitive platform allows you to select a date and time that suits you, ensuring a hassle-free scheduling experience.
            </li>
            <li className="feature-item">
              <strong>Comprehensive Care:</strong> Whether you need a routine check-up, a specialist consultation, or follow-up care, our network of doctors is equipped to address a wide range of medical concerns and provide personalized advice.
            </li>
            <li className="feature-item">
              <strong>Secure and Confidential:</strong> Your privacy is our priority. All consultations are conducted in a secure, encrypted environment, ensuring that your personal health information remains confidential.
            </li>
            <li className="feature-item">
              <strong>Prescription Management:</strong> If necessary, your doctor can prescribe medications directly through the platform. Convenient e-prescriptions allow you to receive your medications quickly at a nearby pharmacy or delivered to your doorstep.
            </li>
            <li className="feature-item">
              <strong>24/7 Availability:</strong> Access healthcare services at any time, day or night. Our online appointment system ensures you can get medical advice when you need it most, without the constraints of traditional office hours.
            </li>
            <li className="feature-item">
              <strong>Medical Records:</strong> Keep track of your health history and consult past records easily through your account. This feature helps in maintaining continuity of care and managing your health effectively.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
