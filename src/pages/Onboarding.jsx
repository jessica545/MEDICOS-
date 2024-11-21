import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Onboarding({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        // Sign-Up with password confirmation check
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      }
      onAuth();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <header>{isLogin ? 'Login' : 'Sign Up'}</header>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        {error && <p className="error">{error}</p>}
      </form>
      <button onClick={toggleForm}>
        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
      </button>
    </div>
  );
}

export default Onboarding;