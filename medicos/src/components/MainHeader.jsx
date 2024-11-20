import React from 'react';
import { Link } from 'react-router-dom';

const MainHeader = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">HealthApp</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
