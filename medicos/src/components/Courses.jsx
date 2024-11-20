// src/components/Courses.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/courses.css';

const Courses = () => {
  const courses = [
    {
      title: "Anatomy",
      description: "Study of the human body",
      modules: [
        { title: "Introduction to Anatomy", lessons: ["Bones", "Muscles", "Organs"], progress: 40 },
        { title: "Systems of the Body", lessons: ["Circulatory System", "Nervous System", "Respiratory System"], progress: 10 },
      ],
    },
    {
      title: "Physiology",
      description: "Study of body functions",
      modules: [
        { title: "Cell Physiology", lessons: ["Cell Membrane", "Cell Communication"], progress: 60 },
        { title: "Organ Physiology", lessons: ["Heart", "Lungs", "Kidneys"], progress: 30 },
      ],
    },
    {
      title: "Biochemistry",
      description: "Study of chemical processes in the body",
      modules: [
        { title: "Basic Biochemistry", lessons: ["Carbohydrates", "Proteins", "Lipids"], progress: 80 },
        { title: "Metabolism", lessons: ["Glycolysis", "Citric Acid Cycle"], progress: 50 },
      ],
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filterCourses = (courses) => {
    return courses.filter((course) => {
      const courseMatches = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());

      const moduleMatches = course.modules.some(module =>
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.lessons.some(lesson => lesson.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      return courseMatches || moduleMatches;
    });
  };

  const sortCourses = (courses) => {
    return courses.sort((a, b) => a.title.localeCompare(b.title));
  };

  const filteredAndSortedCourses = sortCourses(filterCourses(courses));

  return (
    <div className="courses-container">
      <h3>Available Courses</h3>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Courses or Lessons"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="courses-list">
        {filteredAndSortedCourses.map((course, courseIndex) => (
          <div key={courseIndex} className="course-card">
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <div className="modules-list">
              {course.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="module-card">
                  <h5>{module.title}</h5>
                  <p>Progress: {module.progress}%</p>
                  <div className="lessons-list">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="lesson-item">
                        <p>{lesson}</p>
                        <Link to={`/lesson/${lesson}`}>
                          <button className="start-lesson-btn">Start Lesson</button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
