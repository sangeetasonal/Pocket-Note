
import React, { useState } from 'react';
import './NewGroup.css';

function NewGroup({ onCreateGroup, onClose }) {
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('');
  const [error, setError] = useState(''); // Error state to hold warning message

  const handleCreateClick = () => {
    // Check if the group name already exists in localStorage
    const existingGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const groupExists = existingGroups.some(group => group.name.toLowerCase() === groupName.toLowerCase());

    if (groupExists) {
      setError('Group name already exists! Please choose another name.');
    } else {
      if (groupName && groupColor) {
        // If group name doesn't exist, proceed with group creation
        onCreateGroup({ name: groupName, color: groupColor });

        // Clear the fields
        setGroupName('');
        setGroupColor('');
        setError('');
      }
    }
  };

  return (
    <div className="new-group">
      <h2>Create New Group</h2>

      <div className="input-group">
        <label>Group Name</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
        />
      </div>

     
      {error && <p className="error-message">{error}</p>}

      <div className="color-group">
        <label>Choose Color</label>
        <div className="color-options">
          {['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'].map((color) => (
            <button
              key={color}
              className={`color-button ${groupColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setGroupColor(color)} 
            />
          ))}
        </div>
      </div>

      <button className="create" onClick={handleCreateClick}>
        Create
      </button>
    </div>
  );
}

export default NewGroup;
