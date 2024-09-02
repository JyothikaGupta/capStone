import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import Chatbox from './ChatBox';

const Hero = () => {
  const [showChatbox, setShowChatbox] = useState(false);

  const handleChatIconClick = () => {
    setShowChatbox(true);  // Show the chatbox
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">YOUR SAFETY AND WELL-BEING ALL IN ONE PLACE</h1>
        <p className="hero-subtitle">Empowering you to live safer and healthier</p>
        <Link to="/register" >Get Started</Link>
      </div>

      {/* Always render the Chatbox component */}
      <Chatbox isOpen={showChatbox} onClose={() => setShowChatbox(false)} />
      
      {!showChatbox && (
        <div className="chatbot-icon" onClick={handleChatIconClick}>
          {/* Icon content here */}
        </div>
      )}
    </div>
  );
};

export default Hero;
