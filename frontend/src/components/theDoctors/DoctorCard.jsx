// import React from 'react';
// import { BsArrowRight } from 'react-icons/bs'; 
// import './DoctorCard.css'; 

// const DoctorCard = ({ doctor }) => {
//   const { name, specialty, avgRating, totalRating, photo, totalPatients, hospital } = doctor;

//   return (
//     <div className='doctor-card'>
//       <img src={photo} alt={name} className='doctor-photo' />
//       <h3 className='doctor-name'>{name}</h3>
//       <p className='doctor-specialty'>{specialty}</p>
//       <p className='doctor-hospital'>{hospital}</p>
//       <div className='doctor-info'>
//         <span className='doctor-rating'>{avgRating} / 5</span>
//         <span className='doctor-patients'>{totalPatients} patients</span>
//       </div>
//       <div className='arrow-icon-wrapper'>
//         <BsArrowRight className='arrow-icon' /> 
//       </div>
//     </div>
//   );
// };

// export default DoctorCard;




import React from 'react';
import { BsArrowRight } from 'react-icons/bs'; 
import { useNavigate } from 'react-router-dom';
import './DoctorCard.css'; 

const DoctorCard = ({ doctor }) => {
  const { name, specialty, avgRating, totalRating, photo, totalPatients, hospital } = doctor;
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    navigate('/feedback');
  };

  return (
    <div className='doctor-card'>
      <img src={photo} alt={name} className='doctor-photo' />
      <h3 className='doctor-name'>{name}</h3>
      <p className='doctor-specialty'>{specialty}</p>
      <p className='doctor-hospital'>{hospital}</p>
      <div className='doctor-info'>
        <span className='doctor-rating'>{avgRating} / 5</span>
        <span className='doctor-patients'>{totalPatients} patients</span>
      </div>
      <div className='arrow-icon-wrapper'>
        <BsArrowRight className='arrow-icon' /> 
      </div>
      <button onClick={handleFeedbackClick} className='feedback-btn'>Book Appointment</button>
    </div>
  );
};

export default DoctorCard;
