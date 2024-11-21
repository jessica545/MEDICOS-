import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/LessonPage.css';
const LessonPage = () => {
  const { lessonId } = useParams(); // Retrieve the lessonId from the URL

  // Dummy content for each lesson (you can replace this with real data)
  const lessonsData = {
    "Bones": {
      video: "https://www.youtube.com/embed/1",
      notes: "These are the notes for the 'Bones' lesson.",
      test: "This is a dummy test for Bones.",
      qbank: ["Q1: What is the femur?", "Q2: What is the function of the ribs?"]
    },
    "Muscles": {
      video: "https://www.youtube.com/embed/2",
      notes: "These are the notes for the 'Muscles' lesson.",
      test: "This is a dummy test for Muscles.",
      qbank: ["Q1: What is skeletal muscle?", "Q2: What is muscle contraction?"]
    },
    // Add more lessons here...
  };

  const lesson = lessonsData[lessonId]; // Get the corresponding lesson data based on the lessonId

  if (!lesson) {
    return <div>Lesson not found!</div>; // Display an error message if the lesson doesn't exist
  }

  return (
    <div className="lesson-page">
      <h2>{lessonId}</h2>
      <div className="video">
        <h3>Lesson Video</h3>
        <iframe width="560" height="315" src={lesson.video} title="Lesson Video" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
      <div className="notes">
        <h3>Notes</h3>
        <p>{lesson.notes}</p>
      </div>
      <div className="test">
        <h3>Test</h3>
        <p>{lesson.test}</p>
      </div>
      <div className="qbank">
        <h3>Question Bank</h3>
        <ul>
          {lesson.qbank.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonPage;

