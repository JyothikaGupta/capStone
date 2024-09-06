import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-container">
        <h1 className="about-title">About Safe Space</h1>
        <div className="about-content">
          <section className="about-section fade-in">
            <h2>Our Mission</h2>
            <p>
            Safe Space is dedicated to empowering individuals to live safer, healthier lives. Our mission is to provide innovative solutions that enhance personal safety and well-being, ensuring peace of mind for our users and their loved ones.
            </p>
          </section>
          <section className="about-section fade-in">
            <h2>Our Vision</h2>
            <p>
              We envision a world where everyone feels secure and confident in their daily lives, supported by cutting-edge technology and compassionate care. Heaven Mind strives to be at the forefront of personal safety and wellness, constantly innovating to meet the evolving needs of our community.
            </p>
          </section>
          <section className="about-section fade-in">
            <h2>Our Values</h2>
            <ul className="values-list">
              <li>
                <span className="value-icon">🛡️</span>
                <strong></strong> We prioritize the safety and security of our users above all else.
              </li>
              <li>
                <span className="value-icon">💡</span>
                <strong></strong> We continuously strive to develop new and improved ways to protect and support our community.
              </li>
              <li>
                <span className="value-icon">💪</span>
                <strong></strong> We believe in giving people the tools and knowledge they need to take control of their own safety and well-being.
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;