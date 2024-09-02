import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { setAuthHeader, request } from '../../connection/auth';
import './login.css';
import axios from 'axios';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      
     
      console.log(login)
      console.log(password)
      const response = await axios.post('/login', { login, password });
      console.log('Login response:', response.data);

      if (response.data && response.data.token  && response.data.id) {
        console.log('Login successful, token received');
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.id);
        setAuthHeader(response.data.token);
        navigate('/dashboard');
      } else {
        console.error('Login response did not contain a token');
        setError('Invalid response from server. Please try again.');
      }
    } catch (err) {
      console.error('Login failed', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
        setError(`Login failed: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        console.error('No response received');
        setError('No response received from the server. Please try again.');
      } else {
        console.error('Error:', err.message);
        setError(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-form-container">
          <h2>Welcome Back</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Log In</button>
          </form>
          <p className="login-links">
            <Link to="/forgot-password">Forgot password?</Link>
            <span> | </span>
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;