import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { setAuthHeader } from '../../connection/auth';
import './login.css';
import axios from 'axios';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateInput = () => {
    if (!login || !password) {
      setError('Both fields are required.');
      return false;
    }
    // Add more validation as needed, e.g., email format check
    if (!/\S+@\S+\.\S+/.test(login)) {
      setError('Invalid email format.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
  
    setIsSubmitting(true);
    try {
        const response = await axios.post('/login', { login, password });
        if (response.data && response.data.token && response.data.id) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('firstName', response.data.firstName);  // Store the first name
            
            // Show alert notification
            window.alert(`Hi, ${response.data.firstName}, you are logged in`);
            
            setAuthHeader(response.data.token);
            navigate('/home1');
        } else {
            setError('Invalid response from server. Please try again.');
        }
    } catch (err) {
        if (err.response) {
            setError(`Login failed: ${err.response.data.message || err.response.statusText}`);
        } else if (err.request) {
            setError('No response received from the server. Please try again.');
        } else {
            setError(`Error: ${err.message}`);
        }
    } finally {
        setIsSubmitting(false);
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
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Logging In...' : 'Log In'}
          </button>
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

}
export default Login;
