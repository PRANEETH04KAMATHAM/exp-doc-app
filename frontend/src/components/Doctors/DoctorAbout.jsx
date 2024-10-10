import React from 'react';
import './DoctorAbout.css';  // Import the CSS file
import { formateDate } from '../../utils/formateDate';  // Import the corrected function

const DoctorAbout = ({ doctor }) => {
  return (
    <div className="doctor-about-container">
      <div>
        <h3 className="heading">
          About of <span>{doctor.name}</span>
        </h3>
        <p className="paragraph">{doctor.about}</p>
      </div>

      <div className="education-section">
        <h3 className="education-heading">Education</h3>
        <ul className="education-list">
          {doctor.education.map((edu, index) => (
            <li key={index} className="education-item">
              <div>
                <span className="date">{formateDate(edu.startDate)} - {edu.endDate ? formateDate(edu.endDate) : 'Present'}</span>
                <p className="degree">{edu.degree}</p>
                <p className="degree">{edu.university}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="experience-section">
        <h3 className="education-heading">Experience</h3>
        <ul className="experience-list">
          {doctor.experiences.map((exp, index) => (
            <li key={index} className="experience-item">
              <span className="role">{exp.position}</span>
              <p className="degree">{exp.hospital}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DoctorAbout;


