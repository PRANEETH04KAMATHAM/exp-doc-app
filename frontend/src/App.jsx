
// import React, { useEffect } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import Header from './components/header/Header';
// import Footer from './components/footer/Footer';

// // Importing Pages
// import Home from './components/home/Home';
// import Services from './components/services/Services';
// import Login from './components/login/Login';
// import Signup from './components/Signup/Signup';
// import Contact from './components/contact/Contact';
// import Doctors from './components/Doctors/Doctors';
// import DoctorDetails from "./components/Doctors/DoctorDetails";
// import Feedback from './components/Doctors/Feedback';

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// function App() {
//   return (
//     <div id="root">
//       <ScrollToTop />
//       <Header />
//       <Routes>
//         {/* Home Page */}
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />

//         {/* Doctors Page */}
//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/doctors/:id" element={<DoctorDetails />} />

//         {/* Authentication Pages */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Services and Contact Pages */}
//         <Route path="/services" element={<Services />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* Feedback path */}
//         <Route path="/feedback" element={<Feedback />} />

//         {/* Fallback Route for non-existent pages */}
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// export default App;


import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Importing Pages
import Home from './components/home/Home';
import Services from './components/services/Services';
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import Contact from './components/contact/Contact';
import Doctors from './components/Doctors/Doctors';
import DoctorDetails from "./components/Doctors/DoctorDetails";
import Feedback from './components/Doctors/Feedback';

// Import Dashboard components
import DoctorDashboard from './components/dashboard/doctorDashboard/DoctorDashboard.jsx';
import DoctorProfile from './components/dashboard/doctorDashboard/DoctorProfile.jsx';
import DoctorAppointments from './components/dashboard/doctorDashboard/DoctorAppointments.jsx';
import PatientDashboard from './components/dashboard/patientDashboard/PatientDashboard.jsx';
import PatientProfile from './components/dashboard/patientDashboard/PatientProfile.jsx';
import PatientAppointments from './components/dashboard/patientDashboard/PatientAppointments.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div id="root">
      <ScrollToTop />
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Doctors Page */}
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Services and Contact Pages */}
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Feedback path */}
        <Route path="/feedback" element={<Feedback />} />

        {/* Protected Doctor Routes */}
        <Route element={<ProtectedRoute allowedUserTypes={['doctor']} />}>
          <Route path="/doctor-dashboard" element={<DoctorDashboard />}>
            <Route index element={<DoctorProfile />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="appointments" element={<DoctorAppointments />} />
          </Route>
        </Route>

        {/* Protected Patient Routes */}
        <Route element={<ProtectedRoute allowedUserTypes={['patient']} />}>
          <Route path="/patient-dashboard" element={<PatientDashboard />}>
            <Route index element={<PatientProfile />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="appointments" element={<PatientAppointments />} />
          </Route>
        </Route>

        {/* Fallback Route for non-existent pages */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;