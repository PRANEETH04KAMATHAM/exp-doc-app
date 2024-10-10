// import './Header.css';
// import logo2 from '../../assets/images/logo2.png';
// import user from '../../assets/images/user.png';
// import { NavLink, Link } from 'react-router-dom';
// import { BiMenu } from 'react-icons/bi';

// import { useEffect, useRef } from 'react';

// function Header() {

//   const headerRef = useRef(null);
//   const menuRef = useRef(null);

//   const handleStickyHeader = () => {
//     window.addEventListener('scroll', () => {
//       if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//         headerRef.current.classList.add('sticky_header');
//       } else {
//         headerRef.current.classList.remove('sticky_header');
//       }
//     });
//   };

//   useEffect(() => {
//     handleStickyHeader();

//     return () => window.removeEventListener('scroll', handleStickyHeader);
//   });

//   return (
//     <header className="flex items-center p-4 bg-white shadow-md header " ref={headerRef}>
//       <div className="container flex items-center justify-between mx-auto">
//         {/* Logo Section */}
//         <div className="logo-container">
//           <img src={logo2} alt="Logo" className="logo " />
//         </div>

//         {/* Navigation Links */}
//         <nav className="navigation">
//           <ul className="flex items-center menu ">
//             <li>
//               <NavLink to="/home" className="nav-link">
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/doctors" className="nav-link">
//                 Find a Doctor
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/services" className="nav-link">
//                 Services
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/contact" className="nav-link">
//                 Contact
//               </NavLink>
//             </li>
//           </ul>
//         </nav>

//         {/* Profile and Login Section */}
//         <div className="profile-login">
//           <Link to="/">
//             <figure className="profile-pic">
//               <img src={user} alt="User" />
//             </figure>
//           </Link>

//           <Link to="/login">
//             <button className="register-login">
//               REGISTER/LOGIN
//             </button>
//           </Link>

//           {/* Mobile Menu Icon */}
//           <span className="mobile-menu-icon">
//             <BiMenu />
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;



import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './Header.css';
import logo2 from '../../assets/images/logo2.png';
import defaultUser from '../../assets/images/user.png';

function Header() {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleStickyHeader = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky_header');
    } else {
      headerRef.current.classList.remove('sticky_header');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleStickyHeader);
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="logo-container">
          <img src={logo2} alt="Logo" className="logo" />
        </div>

        <nav className={`navigation ${menuOpen ? 'show-menu' : ''}`}>
          <ul className="menu">
            <li><NavLink to="/home" className="nav-link">Home</NavLink></li>
            <li><NavLink to="/doctors" className="nav-link">Find a Doctor</NavLink></li>
            <li><NavLink to="/services" className="nav-link">Services</NavLink></li>
            <li><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
          </ul>
        </nav>

        <div className="profile-login">
          {user ? (
            <>
              <Link to={user.userType === 'patient' ? '/patient-dashboard' : '/doctor-dashboard'}>
                <figure className="profile-pic">
                  <img src={user.profileImage || defaultUser} alt={user.name} />
                </figure>
              </Link>
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/login">
              <button className="register-login">REGISTER/LOGIN</button>
            </Link>
          )}
          <span className="mobile-menu-icon" onClick={toggleMenu}>
            <BiMenu />
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;