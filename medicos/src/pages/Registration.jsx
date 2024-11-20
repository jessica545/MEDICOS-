import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../firebase'; // Import Firebase auth instance
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Firebase registration
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registration successful!');
      navigate('/login'); // Redirect to login page on successful registration
    } catch (err) {
      setError(err.message); // Display any errors from Firebase
    }
  };

  return (
    <div className="registration-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        {error && <p className="error-text">{error}</p>} {/* Display error if present */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
