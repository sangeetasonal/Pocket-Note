import React, { useState, useEffect } from 'react';
import './NoteArea.css';
import sendIcon from '../../assets/images/send.png';
import arrowImg from '../../assets/images/arrow.png'; 

function NoteArea({ selectedGroup, onBackClick }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(`notes_${selectedGroup.name}`)) || [];
    setNotes(savedNotes);
  }, [selectedGroup]);

  useEffect(() => {
    localStorage.setItem(`notes_${selectedGroup.name}`, JSON.stringify(notes));
  }, [notes, selectedGroup]);

  const handleSend = () => {
    if (newNote.trim()) {
      const note = {
        text: newNote,
        timestamp: new Date(),
      };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  const handleInputChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleKeyPress = (e) => {
    // Detect if Enter key is pressed (keyCode 13)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent adding a new line when Enter is pressed
      handleSend(); // Trigger note send on Enter key press
    }
  };

  return (
    <div className="note-area">
      <div className="note-header">
       
        <div className="back-arrow" onClick={onBackClick}>
          <img src={arrowImg} alt="Back" />
        </div>
        <div className="note-group-icon" style={{ backgroundColor: selectedGroup.color }}>
          {selectedGroup.name
            .split(' ')
            .map((word) => word[0])
            .slice(0, 2)
            .join('')}
        </div>
        <h3>{selectedGroup.name}</h3>
      </div>

      <div className="notes-content">
        {notes.map((note, index) => (
          <div key={index} className="note-item">
            <p>{note.text}</p>
            <span className="note-timestamp">
              {note.timestamp && (
                <>
                  <span className="date">
                    {new Date(note.timestamp).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="dot"> • </span>
                  <span className="time">{new Date(note.timestamp).toLocaleTimeString()}</span>
                </>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="note-input-section">
        <div className="input-container">
          <textarea
            placeholder="Enter your text here..."
            value={newNote}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}  // Handle key press
          />
          <button
            onClick={handleSend}
            disabled={!newNote.trim()}
            className={newNote.trim() ? 'send-button active' : 'send-button'}
          >
            <img src={sendIcon} alt="Send" className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteArea;
