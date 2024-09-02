
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Footer from '../../components/Footer/Footer';
import Chatbox from '../../components/Hero/ChatBox';
import './Home.css';

const Home = () => {
  return (
    <>
     <Navbar/>
      <Hero />
      <Chatbox/>
      <Footer/>
    </>
    
  );
};

export default Home;
