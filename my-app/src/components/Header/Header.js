import React from 'react';
import { Link,Navigate, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate=useNavigate()
  async function handleLogout() {

    try {
      
      window.localStorage.clear();
      // navigate('/login');
      window.location.href="/login"
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <nav className="header">
      <div className="container header-container">
        <Link to="/dashboard" className="header-brand">Haven Mind</Link>
        <div className="header-links">
        
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
