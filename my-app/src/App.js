import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../src/pages/Home/Home';
import About from '../src/pages/About/About';
import Services from './pages/Services/Services';
import Login from '../src/pages/Login/Login';
import Register from '../src/pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Emergency from './pages/Emergency/Emergency';
import Intro from './pages/Intro/Intro';
import Instructions from './pages/Instructions/Instructions';
import Test from './pages/Test/test';
import TaskDashboard from '../src/components/TaskDashboard';
import ProtectedRoute from './pages/ProtectedRoute'; // Import the ProtectedRoute component
import Chatbox from './components/Hero/ChatBox';
import NewsFeed from './pages/News/News';
import MoodTracker from './pages/MoodTracker/MoodTracker';
import PreviousScores from './pages/Intro/PreviousScores';
import Home1 from './pages/Home/Home1';
import PreviousMoodReports from './pages/MoodTracker/MoodReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/previous-scores" element={<PreviousScores />} />

        {/* Protected Routes */}
        <Route path="/news" element={<ProtectedRoute element={<NewsFeed />} />} />
        <Route path="/moodtracker" element={<ProtectedRoute element={<MoodTracker />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/emergency" element={<ProtectedRoute element={<Emergency />} />} />
        <Route path="/mentalwellbeing/Introduction" element={<ProtectedRoute element={<Intro />} />} />
        <Route path="/instructions" element={<ProtectedRoute element={<Instructions />} />} />
        <Route path="/test" element={<ProtectedRoute element={<Test />} />} />
        <Route path="/tasks" element={<ProtectedRoute element={<TaskDashboard />} />} />
        <Route path="/home1" element={<ProtectedRoute element={<Home1 />}/>}/>
        <Route path="/previousreports" element={<ProtectedRoute element={<PreviousMoodReports />}/>}/>

        {/* Redirect to mentalwellbeing introduction */}
        <Route path="/mentalwellbeing" element={<Navigate to="/mentalwellbeing/Introduction" />} />
      </Routes>
    </Router>
  );
}

export default App;
