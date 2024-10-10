import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import home2 from '../../assets/images/home2.jpg';
import find_doc_water from '../../assets/images/find_doc_water.png';
import doc from '../../assets/images/doc.png';
import appoint from '../../assets/images/appoint.png';
import './Home.css';
import { BsArrowRight } from 'react-icons/bs';
import About from '../about/About';
import ServicesList from '../services/ServicesList';
import DoctorList from '../theDoctors/DoctorList';

const Home = () => {
  const [gradient, setGradient] = useState(''); 
  const navigate = useNavigate(); // Add navigate hook for routing

  // Function to generate gradient effect
  useEffect(() => {
    const generateLowFadeGradient = () => {
      const colors = [
        '#E0F7FA',
        '#B2EBF2',
        '#80DEEA',
        '#4DD0E1',
        '#26C6DA',
        '#B2DFDB',
        '#C5E1A5',
        '#F0F4C3',
      ];

      const color1 = colors[Math.floor(Math.random() * colors.length)];
      const color2 = colors[Math.floor(Math.random() * colors.length)];

      return `linear-gradient(to right, ${color1}, ${color2})`;
    };

    setGradient(generateLowFadeGradient());
  }, []);

  // Function to handle 'Get Appointment' button click
  const handleAppointmentClick = () => {
    navigate('/doctors'); // Navigate to doctors page on click
  };

  return (
    <>
      <section className="home-section" style={{ background: gradient }}>
        <div className="container">
          <div className="content">
            <div className="text-container">
              <h1 className="heading">
                Welcome to ALPHA MEDICAL CARE, We support your journey to health and wellness.
              </h1>
              <p className="paragraph">
                Book your medical appointments online quickly and easily, from the comfort of your home.
              </p>
              <button className="btn" onClick={handleAppointmentClick}>Get Appointment</button>
            </div>
            <div className="stats">
              <div className="stat-item">
                <h2 className="stat-number">10+</h2>
                <span className="stat-line stat-line-green"></span>
                <p className="stat-label">Clinic locations</p>
              </div>
              <div className="stat-item">
                <h2 className="stat-number">70+</h2>
                <span className="stat-line stat-line-yellow"></span>
                <p className="stat-label">Certified Doctors</p>
              </div>
              <div className="stat-item">
                <h2 className="stat-number">100%</h2>
                <span className="stat-line stat-line-blue"></span>
                <p className="stat-label">Patient satisfaction</p>
              </div>
            </div>
            <div className="image-container">
              <img className="home-image" src={home2} alt="Healthcare professionals" />
            </div>
          </div>
        </div>
      </section>

      {/* Medical Services Section */}
      <section>
        <div className="container">
          <div className="text-center My_Services">
            <h2 className="heading">Providing the best medical services</h2>
            <p className="paragraph">
              World-class care for everyone. Our health system offers unmatched expert healthcare from the lab to the clinic.
            </p>
          </div>
          <div className="grid MyServiceCards">
            <div className="service-item">
              <div className="icon-container">
                <img src={find_doc_water} alt="Doctor icon" />
              </div>
              <h2 className="service-title">Find a Doctor</h2>
              <p className="service-desc">
                World-class care for everyone. Our health system offers unmatched expert healthcare from the lab to the clinic.
              </p>
              <Link to="/doctors" className="icon-link">
                <div className="circle-icon">
                  <BsArrowRight className="arrow-icon" />
                </div>
              </Link>
            </div>

            <div className="service-item">
              <div className="icon-container">
                <img src={doc} alt="Doctor icon" />
              </div>
              <h2 className="service-title">Consult a Specialist</h2>
              <p className="service-desc">
                World-class care for everyone. Our health system offers unmatched expert healthcare from the lab to the clinic.
              </p>
              <Link to="/specialists" className="icon-link">
                <div className="circle-icon">
                  <BsArrowRight className="arrow-icon" />
                </div>
              </Link>
            </div>

            <div className="service-item">
              <div className="icon-container">
                <img src={appoint} alt="Appointment icon" />
              </div>
              <h2 className="service-title">Book Doctor Appointment</h2>
              <p className="service-desc">
                World-class care for everyone. Our health system offers unmatched expert healthcare from the lab to the clinic.
              </p>
              <Link to="/appointments" className="icon-link">
                <div className="circle-icon">
                  <BsArrowRight className="arrow-icon" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Medical Services List */}
      <section className="MyCon">
        <div className="container">
          <div className="xl:w-[470px] mx-auto My_Services">
            <h2 className="text-center heading">OUR MEDICAL SERVICES</h2>
            <p className="text-center text_para p_MY">
              World-class care for everyone. Our health system offers unmatched expert healthcare from the lab to the clinic.
            </p>
          </div>
          <ServicesList />
        </div>
      </section>

      {/* Doctors Section */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="text-center heading">OUR DOCTORS</h2>
            <p className="text-center text_para p_MY">
              World-class care for everyone. Our health system offers unmatched, expert healthcare.
            </p>
          </div>
          <DoctorList />
        </div>
      </section>
    </>
  );
};

export default Home;
