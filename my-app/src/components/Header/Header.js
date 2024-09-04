import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/image.png'; // Make sure to place your logo image in the correct path

const Header = () => {
  const navigate = useNavigate();
  
  async function handleLogout() {
    try {
      window.localStorage.clear();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  
  return (
    <nav className="header">
      <div className="container header-container">
        <Link to="/dashboard" className="header-brand">
          <img src={logo} alt="Logo" className="header-logo" />
          Haven Mind
        </Link>
        <div className="header-links">
          <Link to="/news" className="header-link">News</Link>
          <Link to="/moodtracker" className="header-link">Mood Tracker</Link>
          <Link to="/tasks" className="header-link">Task Creation</Link>
          <Link to="/mentalwellbeing/Introduction" className="header-link">Mental Well Being</Link>
          <Link to="/emergency" className="header-link">Emergency</Link>
          <Link to="/dashboard" className="header-link">Recommendations</Link>
          <Link onClick={handleLogout} className="header-link">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
