import React from 'react';
import './Doctors.css';
import DoctorCard from "./../../components/theDoctors/DoctorCard";
import { doctors } from '../../assets/data/doctors';

const Doctors = () => {
  return (
    <>
      <div className="doctor-section">
        <div className="container">
          <h2 className="heading">Find a Doctor</h2>
          <div className="search-container">
            <input id="search-box" type="search" className="search-input" placeholder="Search for doctors..." />
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>

<section>
  <div className="container">
  <div className='doctor-list'>
      {doctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  </div>
</section>
    </>
  );
};

export default Doctors;
