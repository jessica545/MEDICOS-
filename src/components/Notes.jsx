import React, { useState, useEffect } from 'react';
import '../styles/notes.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', category: '', priority: 'Low', dueDate: '', tags: '', reminder: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [uploadedPDFs, setUploadedPDFs] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
    
    const savedPDFs = JSON.parse(localStorage.getItem('pdfs')) || [];
    setUploadedPDFs(savedPDFs);
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewNote({
      ...newNote,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedNotes = notes.map((note) =>
        note.id === currentNoteId ? { ...note, ...newNote } : note
      );
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setEditMode(false);
    } else {
      const newNoteWithId = { ...newNote, id: Date.now() };
      const updatedNotes = [...notes, newNoteWithId];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
    setNewNote({ title: '', content: '', category: '', priority: 'Low', dueDate: '', tags: '', reminder: false });
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleEdit = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setNewNote({
      title: noteToEdit.title,
      content: noteToEdit.content,
      category: noteToEdit.category,
      priority: noteToEdit.priority,
      dueDate: noteToEdit.dueDate,
      tags: noteToEdit.tags,
      reminder: noteToEdit.reminder,
    });
    setCurrentNoteId(id);
    setEditMode(true);
  };

  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const newPDF = { name: file.name, url: URL.createObjectURL(file) };
      const updatedPDFs = [...uploadedPDFs, newPDF];
      setUploadedPDFs(updatedPDFs);
      localStorage.setItem('pdfs', JSON.stringify(updatedPDFs));
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-container">
      <div className="left-section">
        <h2>Notes</h2>

        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <form onSubmit={handleSubmit} className="note-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newNote.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={newNote.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={newNote.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={newNote.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={newNote.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="reminder"
                checked={newNote.reminder}
                onChange={handleChange}
              />
              Set Reminder
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={newNote.tags}
              onChange={handleChange}
            />
          </div>

          <button type="submit">{editMode ? 'Update Note' : 'Add Note'}</button>
        </form>

        <div className="notes-list">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div key={note.id} className="note-item">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <small>Category: {note.category}</small>
                <small>Priority: {note.priority}</small>
                <small>Due Date: {note.dueDate}</small>
                <small>Tags: {note.tags}</small>
                <button onClick={() => handleEdit(note.id)}>Edit</button>
                <button onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No notes found</p>
          )}
        </div>
      </div>

      <div className="right-section">
        <h3>Lecture Notes</h3>
        <input type="file" accept="application/pdf" onChange={handlePDFUpload} />
        <div className="uploaded-pdfs">
          {uploadedPDFs.length > 0 ? (
            uploadedPDFs.map((pdf, index) => (
              <div key={index}>
                <a href={pdf.url} target="_blank" rel="noopener noreferrer">{pdf.name}</a>
              </div>
            ))
          ) : (
            <p>No PDF notes uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notes;
