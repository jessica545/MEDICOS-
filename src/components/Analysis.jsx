import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/Analysis.css';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Analysis = () => {
  // Dummy Data
  const performanceData = {
    labels: ['Math', 'Science', 'English', 'History', 'Art'],
    datasets: [
      {
        label: 'Test Scores (%)',
        data: [85, 60, 75, 50, 90],
        backgroundColor: ['#4caf50', '#ff5722', '#2196f3', '#ffc107', '#9c27b0'],
      },
    ],
  };

  const studyTimeData = {
    labels: ['Math', 'Science', 'English', 'History', 'Art'],
    datasets: [
      {
        data: [12, 8, 10, 6, 14],
        backgroundColor: ['#4caf50', '#ff5722', '#2196f3', '#ffc107', '#9c27b0'],
      },
    ],
  };

  const aiInsights = [
    "Focus more on History, as your scores are low (50%).",
    "Increase study time for Science to improve understanding.",
    "You're doing great in Art! Keep up the good work.",
    "Consider revising English topics for consistent performance.",
  ];

  return (
    <div className="analysis">
      <h2>Analysis Dashboard</h2>
      <p>Track your performance, study time, and readiness here.</p>

      {/* Performance Chart */}
      <div className="chart-container bar-chart-container">
        <h3>Performance by Subject</h3>
        <Bar 
          data={performanceData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.75, // Decrease the size of the bar chart even further
            plugins: {
              legend: { labels: { color: '#ffffff' } }, // White legend labels
              tooltip: { titleColor: '#ffffff', bodyColor: '#ffffff' }, // White tooltip text
            },
            scales: {
              x: {
                ticks: { color: '#ffffff' }, // White labels for X-axis
              },
              y: {
                ticks: { color: '#ffffff' }, // White labels for Y-axis
              },
            },
          }} 
        />
      </div>

      {/* Study Time Chart (Pie) */}
      <div className="chart-container pie-chart-container">
        <h3>Study Time (Hours)</h3>
        <Pie 
          data={studyTimeData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.75, // Decrease the size of the pie chart
            plugins: {
              legend: { labels: { color: '#ffffff' } }, // White legend labels
              tooltip: { titleColor: '#ffffff', bodyColor: '#ffffff' }, // White tooltip text
            },
          }} 
        />
      </div>

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

export default Analysis;
