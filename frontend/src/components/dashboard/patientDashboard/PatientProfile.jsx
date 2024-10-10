import React from 'react';
import { useOutletContext } from 'react-router-dom';

const PatientProfile = () => {
  const { patientData } = useOutletContext();

  if (!patientData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Patient Profile</h2>
      <p>Name: {patientData.name}</p>
      <p>Email: {patientData.email}</p>
      <p>Age: {patientData.age}</p>
      <p>Gender: {patientData.gender}</p>
      <p>Contact Number: {patientData.contactNumber}</p>
      <p>Address: {patientData.address}</p>
    </div>
  );
};

export default PatientProfile;