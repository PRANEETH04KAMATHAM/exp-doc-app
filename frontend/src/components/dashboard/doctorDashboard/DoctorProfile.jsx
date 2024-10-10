import React from 'react';
import { useOutletContext } from 'react-router-dom';

const DoctorProfile = () => {
  const { doctorData } = useOutletContext();

  if (!doctorData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Doctor Profile</h2>
      <p>Name: {doctorData.name}</p>
      <p>Email: {doctorData.email}</p>
      <p>Specialization: {doctorData.specialization}</p>
      <p>Hospital: {doctorData.hospitalName}</p>
      <p>Contact Number: {doctorData.contactNumber}</p>
    </div>
  );
};

export default DoctorProfile;