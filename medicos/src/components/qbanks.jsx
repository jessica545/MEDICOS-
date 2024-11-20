import React, { useState } from 'react';
import '../styles/QBanks.css';

const QBanks = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Dummy data for question banks
  const questionBanks = [
    { id: 1, topic: 'Math', subtopics: ['Algebra', 'Geometry', 'Calculus'] },
    { id: 2, topic: 'Science', subtopics: ['Physics', 'Chemistry', 'Biology'] },
    { id: 3, topic: 'History', subtopics: ['World Wars', 'Ancient Civilizations', 'Modern History'] },
    { id: 4, topic: 'English', subtopics: ['Grammar', 'Literature', 'Vocabulary'] },
  ];

  const aiInsights = [
    'Based on your performance, focus more on Geometry.',
    'Try practicing Algebra with increased difficulty for improvement.',
    'Excellent performance in Physics! Keep up the good work.',
  ];

  return (
    <div className="q-banks">
      <h2>Question Banks</h2>
      <p>Select from a variety of question banks to practice and test your knowledge.</p>

      {/* List of Question Banks */}
      <div className="topics">
        {questionBanks.map((bank) => (
          <div
            key={bank.id}
            className="topic-card"
            onClick={() => setSelectedTopic(bank)}
          >
            <h3>{bank.topic}</h3>
            <p>{bank.subtopics.join(', ')}</p>
          </div>
        ))}
      </div>

      {/* Selected Topic Details */}
      {selectedTopic && (
        <div className="selected-topic">
          <h3>{selectedTopic.topic} Question Bank</h3>
          <ul>
            {selectedTopic.subtopics.map((subtopic, index) => (
              <li key={index}>{subtopic}</li>
            ))}
          </ul>
          <button onClick={() => alert('Starting practice session...')}>
            Start Practice
          </button>
        </div>
      )}

      {/* AI Insights */}
      <div className="ai-insights">
        <h3>AI Insights</h3>
        <ul>
          {aiInsights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QBanks;

