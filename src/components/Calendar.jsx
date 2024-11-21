import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';

// Dummy data for initial events
const events = [
  { date: new Date(2024, 10, 20), title: 'Math Exam' },
  { date: new Date(2024, 10, 25), title: 'Science Exam' },
  { date: new Date(2024, 10, 30), title: 'History Test' },
];

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState(events);
  const [noteDate, setNoteDate] = useState('');
  const [noteText, setNoteText] = useState('');

  // Filter events by selected date
  const getEventsForDate = (selectedDate) =>
    reminders.filter((event) => event.date.toDateString() === selectedDate.toDateString());

  // Handle adding a new reminder
  const handleAddNote = () => {
    if (noteDate && noteText) {
      const newReminder = { date: new Date(noteDate), title: noteText };
      setReminders([...reminders, newReminder]);
      setNoteDate('');
      setNoteText('');
    }
  };

  return (
    <div className="calendar-page">
      {/* Sidebar for events */}
      <div className="sidebar">
        <h3>Assignments & Reminders</h3>
        <ul className="reminders-list">
          {reminders.map((reminder, index) => (
            <li key={index}>
              {reminder.title} - {reminder.date.toDateString()}
            </li>
          ))}
        </ul>
        {/* Form to add a new note */}
        <div className="add-note">
          <h4>Add New Reminder</h4>
          <input
            type="date"
            value={noteDate}
            onChange={(e) => setNoteDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Note"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button className="add-reminder-button" onClick={handleAddNote}>
            Add Reminder
          </button>
        </div>
      </div>

      {/* Calendar display */}
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={({ date }) =>
            getEventsForDate(date).map((event, index) => (
              <div key={index} className="event-dot"></div>
            ))
          }
        />
        <div className="event-details">
          <h4>Events for {date.toDateString()}:</h4>
          <ul>
            {getEventsForDate(date).length > 0 ? (
              getEventsForDate(date).map((event, index) => (
                <li key={index}>{event.title}</li>
              ))
            ) : (
              <li>No events for today</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
