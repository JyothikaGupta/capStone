import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/image.png';
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  
  async function handleLogout() {
    try {
      window.localStorage.clear();
      window.location.href = "/login";
      toast.success("Logged out successfully!");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  
  return (
    <nav className="header">
      <div className="container header-container">
        
        <Link to="/home1" className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
          Safe Space
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
