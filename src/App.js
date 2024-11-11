import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import MainContent from './components/maincontent/MainContent';
import NoteArea from './components/notearea/NoteArea';  // Import the NoteArea component

function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showNoteArea, setShowNoteArea] = useState(false);  // State to control note area visibility

  // Handle group selection
  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setShowNoteArea(true);  // Show NoteArea when a group is selected
  };

  // Handle creation of a new group and select it
  const handleGroupCreate = (newGroup) => {
    setSelectedGroup(newGroup);
    setShowNoteArea(true);  // Show NoteArea when a new group is created
  };

  // Handle back to sidebar
  const handleBackClick = () => {
    setShowNoteArea(false);  // Hide NoteArea and show Sidebar again
  };

  return (
    <div className="app">
      <Sidebar onGroupSelect={handleGroupSelect} onGroupCreate={handleGroupCreate} />
      {showNoteArea ? (
        <NoteArea
          selectedGroup={selectedGroup}
          onBackClick={handleBackClick}  // Pass the back click handler to NoteArea
        />
      ) : (
        <MainContent selectedGroup={selectedGroup} />
      )}
    </div>
  );
}

export default App;
