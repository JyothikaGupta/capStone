import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Hero.css';
import Chatbox from './ChatBox';

const Hero = () => {
  const [showChatbox, setShowChatbox] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleChatIconClick = () => {
    const token = localStorage.getItem('authToken'); // Adjust key as needed
    
    if (token) {
      setShowChatbox(true); // Show the chatbox
    } else {
      setMessage('Kindly log in to use the chatbox');
      navigate('/login'); // Navigate to the login page
    }
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">YOUR SAFETY AND WELL-BEING ALL IN ONE PLACE</h1>
        <p className="hero-subtitle">Empowering you to live safer and healthier</p>
        <Link to="/register">Get Started</Link>
      </div>

      {/* Always render the Chatbox component */}
      {showChatbox && <Chatbox isOpen={showChatbox} onClose={() => setShowChatbox(false)} />}
      
      {!showChatbox && (
        <div className="chatbot-icon" onClick={handleChatIconClick}>
          {/* Icon content here */}
        </div>
      )}
      
      {message && <div className="login-message">{message}</div>} {/* Display the message if needed */}
    </div>
  );
};

export default Hero;
