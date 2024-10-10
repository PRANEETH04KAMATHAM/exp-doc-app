import React from 'react';
import { doctors } from '../../assets/data/doctors';
import DoctorCard from './DoctorCard';
import './DoctorList.css'; // Importing the CSS file

const DoctorList = () => {
  return (
    <div className='doctor-list'>
      {doctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
