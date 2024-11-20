import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { auth } from '../firebase'; // Firebase setup
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Firebase login
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userLoggedIn', true);
      navigate('/dashboard');
    } catch (err) {
      setError('Incorrect email or password'); // Display error if login fails
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="welcome-text">Welcome to Our App</h1>
        <form onSubmit={handleLogin} className="login-form">
          {error && <p className="error-text">{error}</p>} {/* Display error if login fails */}
          <div className="input-container">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="login-input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-link">
          <Link to="/registration" className="signup-link-text">Need an account? Sign Up</Link> {/* Updated to navigate to Registration */}
        </div>
      </div>
    </div>
  );
};

export default Login;