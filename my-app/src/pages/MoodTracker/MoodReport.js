import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MoodReport.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const API_BASE_URL = 'http://localhost:8041/api/mood';

const PreviousMoodReports = () => {
  const [previousMoodReports, setPreviousMoodReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchPreviousMoodReports = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User ID not found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/entries`, {
        params: { userId: userId }
      });
      setPreviousMoodReports(response.data);
    } catch (error) {
      setError('Error fetching previous mood reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreviousMoodReports();
  }, []);

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`${API_BASE_URL}/entries/${reportId}`);
      // Refresh the list after deletion
      fetchPreviousMoodReports();
    } catch (error) {
      setError('Error deleting mood report');
    }
  };

  return (
    <div className="previous-mood-reports-container">
      <Header />
      <h1>Previous Mood Reports</h1>
      <button onClick={() => navigate('/moodtracker')} className="back-button">Back to Mood Tracker</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="reports-grid">
          {previousMoodReports.map((report) => (
            <div key={report.id} className="report-card">
              <h3>Date: {new Date(report.entryDate).toLocaleDateString()}</h3>
              <p>Mood Score: {report.moodScore}</p>
              <p>Journal Entry: {report.journalEntry}</p>
              <p>Sleep Hours: {report.sleepHours}</p>
              <p>Water Intake: {report.waterIntake} ml</p>
              <button onClick={() => handleDelete(report.id)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PreviousMoodReports;