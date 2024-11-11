
import React from 'react';
import './GroupList.css';

function GroupList({ groups, onGroupClick, onDeleteGroup, selectedGroup }) {
  return (
    <div className="group-list">
      {groups.map((group, index) => {
        // Split the group name into words
        const words = group.name.split(' ');

        // Determine initials based on the number of words
        const initials = words.length > 1
          ? `${words[0][0]}${words[1][0]}` // First letter of the first two words
          : `${words[0].slice(0, 2)}`; // Only one word, take the first two letters

        return (
          <div
            key={index}
            className={`group-item ${selectedGroup === group ? 'selected' : ''}`} // Add 'selected' class
            onClick={() => onGroupClick(group)}
          >
            <div className="group-info">
              <div className="group-icon" style={{ backgroundColor: group.color }}>
                {initials.toUpperCase()} 
              </div>
              <span className="group-name">{group.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GroupList;

