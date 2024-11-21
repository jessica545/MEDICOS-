import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the login status from localStorage and redirect to the login page
    localStorage.removeItem('userLoggedIn');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        <li><Link to="/analysis">Analysis</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/qbanks">Qbanks</Link></li>
        <li><Link to="/tests">Tests</Link></li>
        <li><Link to="/videorecordings">Video Recordings</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
      </ul>
      <button onClick={handleLogout} className="logout-button">Logout</button> {/* Logout button */}
    </div>
  );
};

export default Sidebar;
