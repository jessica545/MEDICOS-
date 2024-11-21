// src/pages/Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar';
import Courses from '../components/Courses';


const Dashboard = () => (
  <div className="dashboard">
    <Sidebar />
    <div className="main-content">
      <h1>Dashboard</h1>

      <Courses />
    </div>
  </div>
);

export default Dashboard;