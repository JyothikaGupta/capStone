import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { request } from '../../connection/auth'; // Import your auth utility functions
import './Register.css';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');  // New state for firstName
  const [lastName, setLastName] = useState('');    // New state for lastName
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Include 'firstName' and 'lastName' in the request body
      //const response = await request('post', '/register', { firstName, lastName, login, password });
      const response = await axios.post('/register', { firstName, lastName, login, password });

      console.log('Registration successful', response.data);
      // Redirect to login page or automatically log the user in
      navigate('/login');
    } catch (err) {
      console.error('Registration failed', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="register-page">
      <Navbar />
      <div className="register-container">
        <div className="register-form-container">
          <h2>Create Your Account</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="login">Email</label>
              <input
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
          <p className="register-login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
