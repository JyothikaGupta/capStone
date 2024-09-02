import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import INSTRUCTIONS from './Instructions.ts';
import './Instructions.css';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';

const Instructions = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/test'); // Ensure this path matches the route in your application
  };

  useEffect(() => {
    // Function to add 'show' class for animation
    const handleScroll = () => {
      const instructionItems = document.querySelectorAll('.instruction-item');
      const windowHeight = window.innerHeight;
      instructionItems.forEach(item => {
        const { top, bottom } = item.getBoundingClientRect();
        if (top < windowHeight && bottom > 0) {
          item.classList.add('show');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='instructions-container'>
      <Header />
      <div className="instructions">
        <h1>Mental Health Check</h1>
        <p>
          Assess your well-being with a comprehensive 25-question test. Based on the Burns Depression Checklist from Feeling Good: the new mood therapy.
        </p>
        <div className="instruction-list">
          {INSTRUCTIONS.map((instruction, index) => (
            <div key={index} className="instruction-item">
              <img src={instruction.image} alt={`Instruction ${index + 1}`} />
              <p>{instruction.text}</p>
            </div>
          ))}
        </div>
        <p>
          Don't wait anymore to start taking control of your mind and your life.
        </p>
        
        <button onClick={handleStartTest} className="cta-button">
           Take test now
        </button>

      </div>
      <Footer />
    </div>
  );
};

export default Instructions;
