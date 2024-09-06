import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Hero1 from '../../components/Hero/Hero1';
import Chatbox from '../../components/Hero/ChatBox';
import Footer from '../../components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const Home1 = () => {
  const [greetingMessage, setGreetingMessage] = useState('');

  useEffect(() => {
    const message = localStorage.getItem('greetingMessage');
    console.log('Retrieved message:', message); // Check if message is retrieved
    if (message) {
      setGreetingMessage(message);
      localStorage.removeItem('greetingMessage');  // Clear the message after displaying it
      toast.info(message);  // Display the notification
    }
  }, []);

  return (
    <>
      <Header />
      <Hero1 />
      <Chatbox />
      <Footer />
      <ToastContainer /> {/* Add this component */}
    </>
  );
};

export default Home1;
