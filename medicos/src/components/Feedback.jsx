// src/components/Feedback.jsx
import React, { useState, useEffect } from 'react';
import '../styles/feedback.css'; // Import the CSS file for styling

function Feedback() {
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [feedbackList, setFeedbackList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Load previously submitted feedback from local storage
  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem('feedbackList')) || [];
    setFeedbackList(storedFeedback);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({
      ...feedbackData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!feedbackData.name || !feedbackData.email || !feedbackData.message) {
      setMessage('All fields are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(feedbackData.email)) {
      setMessage('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    if (validateForm()) {
      setIsSubmitting(true);
      // Save feedback data to local storage
      const newFeedbackList = [...feedbackList, feedbackData];
      localStorage.setItem('feedbackList', JSON.stringify(newFeedbackList));
      setFeedbackList(newFeedbackList);
      setFeedbackData({
        name: '',
        email: '',
        message: '',
      });
      setIsSubmitting(false);
      setMessage('Feedback submitted successfully!');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={feedbackData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={feedbackData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={feedbackData.message}
            onChange={handleChange}
            placeholder="Enter your feedback"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      {message && <p className="feedback-message">{message}</p>}

      <h3>Previous Feedback</h3>
      <div className="feedback-list">
        {feedbackList.length > 0 ? (
          feedbackList.map((feedback, index) => (
            <div key={index} className="feedback-item">
              <p><strong>{feedback.name}</strong> ({feedback.email})</p>
              <p>{feedback.message}</p>
            </div>
          ))
        ) : (
          <p>No feedback submitted yet.</p>
        )}
      </div>
    </div>
  );
}

export default Feedback;
