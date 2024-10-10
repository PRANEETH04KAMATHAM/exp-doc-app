// import React from 'react';
// import './SidePanel.css';

// const SidePanel = () => {
//   return (
//     <div className="p-3 rounded shadow-panelShadow lg:p-5-md side-panel">
//       <div className="flex items-center justify-between">
//         <p className="mt-0 font-semibold text_para">Ticket price</p>
//         <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
//           500 BDT
//         </span>
//       </div>
//       <div className="mt-[30px]">
//         <p className="mt-0 font-semibold text_para text-headingColor">Available Time Slots:</p>
//         <ul className="mt-3">
//           <li className="flex items-center justify-between mb-2">
//             <p className="text-[15px] leading-6 text-textColor font-semibold">Sunday</p>
//             <p className="text-[15px] leading-6 text-textColor font-semibold">4:00 PM - 9:30 PM</p>
//           </li>
//           <li className="flex items-center justify-between mb-2">
//             <p className="text-[15px] leading-6 text-textColor font-semibold">Monday</p>
//             <p className="text-[15px] leading-6 text-textColor font-semibold">4:00 PM - 9:30 PM</p>
//           </li>
//           <li className="flex items-center justify-between mb-2">
//             <p className="text-[15px] leading-6 text-textColor font-semibold">Tuesday</p>
//             <p className="text-[15px] leading-6 text-textColor font-semibold">4:00 PM - 9:30 PM</p>
//           </li>
//         </ul>
//       </div>
//       <button className="w-full px-2 rounded btn-md">Book Appointment</button>
//     </div>
//   );
// };

// export default SidePanel;









import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SidePanel.css';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { createAppointment } from '../../api';

const SidePanel = ({ doctor }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const { user } = useAuth();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = async () => {
    if (selectedDate && selectedTime && doctor) {
      try {
        await createAppointment({
          doctorId: doctor._id,
          date: selectedDate,
          time: selectedTime
        }, user.token);
        setAppointmentBooked(true);
        setShowCalendar(false);
      } catch (error) {
        console.error('Error booking appointment:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  if (!doctor) {
    return (
      <div className="side-panel">
        <p>Loading doctor information...</p>
        <p>Debug info: doctor prop is {doctor === undefined ? 'undefined' : 'null'}</p>
      </div>
    );
  }

  return (
    <div className="side-panel-wrapper">
      <div className="side-panel">
        <div className="flex justify-between items-center">
          <p className="text_para font-semibold">Ticket price</p>
          <span className="text-headingColor font-bold text-[16px] leading-7 lg:text-[22px] lg:leading-8">
            {doctor.ticketPrice || 'N/A'} BDT
          </span>
        </div>
        <div className="mt-[30px]">
          <p className="text_para font-semibold text-headingColor">Available Time Slots:</p>
          <ul className="mt-3">
            {doctor.availableTimeSlots && doctor.availableTimeSlots.map((slot, index) => (
              <li key={index} className="flex justify-between mb-2">
                <p className="text-[15px] leading-6 text-textColor font-semibold">{slot.day}</p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">{slot.time}</p>
              </li>
            ))}
          </ul>
        </div>
        <button className="w-full px-2 rounded btn-md mt-4" onClick={() => setShowCalendar(!showCalendar)}>
          {showCalendar ? 'Hide Calendar' : 'Book Appointment'}
        </button>
        {appointmentBooked && (
          <p className="mt-4 text-center text-green-600">
            Appointment booked for: {selectedDate.toLocaleDateString()} at {selectedTime}
          </p>
        )}
      </div>
      {showCalendar && (
        <div className="calendar-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            minDate={new Date()}
          />
          {selectedDate && doctor.availableTimeSlots && (
            <div className="mt-4">
              <p className="text_para font-semibold">Select Time:</p>
              <select
                className="w-full p-2 mt-2 border rounded"
                value={selectedTime}
                onChange={(e) => handleTimeChange(e.target.value)}
              >
                <option value="">Choose a time</option>
                {doctor.availableTimeSlots
                  .find(slot => slot.day === selectedDate.toLocaleDateString('en-US', { weekday: 'long' }))
                  ?.availableTimes.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  ))
                }
              </select>
            </div>
          )}
          {selectedDate && selectedTime && (
            <button className="w-full px-2 rounded btn-md mt-4" onClick={handleBookAppointment}>
              Confirm Appointment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SidePanel;