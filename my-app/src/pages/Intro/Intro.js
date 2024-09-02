import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import MentalWellBeingAnimationData from '../../assets/lottie/mental-wellbeing-seek-help.json';
import './Intro.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Intro() {
  return (
    <div className="page-container">
      <Header />
      <div className="intro-content">
        <div className="text-content">
          <h1>Assess Your Mental Well-being</h1>
          <p>
            Take a simple, reliable test to understand your emotional state. MindCheck helps you gain insight into your thoughts, feelings, and overall mental well-being. Get started on your journey to self-awareness and improved mental health today.
          </p>
          <Link to="/instructions" className="cta-button">Start Your Assessment</Link>
        </div>
        <Lottie animationData={MentalWellBeingAnimationData} className="lottie-animation" />
      </div>
      <Footer />
    </div>
  );
}

export default Intro;
