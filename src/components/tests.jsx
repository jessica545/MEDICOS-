import React, { useState } from 'react';
import '../styles/Tests.css';

const Tests = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [filters, setFilters] = useState({ subject: 'All', difficulty: 'All' });

  // Dummy data for tests
  const tests = [
    {
      id: 1,
      name: 'Math Basics Quiz',
      subject: 'Math',
      difficulty: 'Easy',
      duration: '15 min',
      questions: 10,
    },
    {
      id: 2,
      name: 'Advanced Physics Test',
      subject: 'Science',
      difficulty: 'Hard',
      duration: '30 min',
      questions: 20,
    },
    {
      id: 3,
      name: 'World History Challenge',
      subject: 'History',
      difficulty: 'Medium',
      duration: '25 min',
      questions: 15,
    },
    {
      id: 4,
      name: 'English Grammar Practice',
      subject: 'English',
      difficulty: 'Easy',
      duration: '20 min',
      questions: 12,
    },
    {
      id: 5,
      name: 'Grand Test: Science and Math',
      subject: 'Mixed',
      difficulty: 'Hard',
      duration: '60 min',
      questions: 50,
    },
  ];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredTests = tests.filter(
    (test) =>
      (filters.subject === 'All' || test.subject === filters.subject) &&
      (filters.difficulty === 'All' || test.difficulty === filters.difficulty)
  );

  return (
    <div className="tests">
      <h2>Tests</h2>
      <p>Access practice tests to evaluate your preparation.</p>

      {/* Filters */}
      <div className="filters">
        <select
          value={filters.subject}
          onChange={(e) => handleFilterChange('subject', e.target.value)}
        >
          <option value="All">All Subjects</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="English">English</option>
          <option value="Mixed">Mixed</option>
        </select>
        <select
          value={filters.difficulty}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* List of Tests */}
      <div className="test-list">
        {filteredTests.map((test) => (
          <div key={test.id} className="test-card" onClick={() => setSelectedTest(test)}>
            <h3>{test.name}</h3>
            <p>Subject: {test.subject}</p>
            <p>Difficulty: {test.difficulty}</p>
            <p>Duration: {test.duration}</p>
            <p>Questions: {test.questions}</p>
            <button>Start Test</button>
          </div>
        ))}
      </div>

      {/* Selected Test Details */}
      {selectedTest && (
        <div className="test-details">
          <h3>{selectedTest.name}</h3>
          <p>Subject: {selectedTest.subject}</p>
          <p>Difficulty: {selectedTest.difficulty}</p>
          <p>Duration: {selectedTest.duration}</p>
          <p>Questions: {selectedTest.questions}</p>
          <button onClick={() => alert('Test Started!')}>Start Test</button>
          <button onClick={() => setSelectedTest(null)}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default Tests;
