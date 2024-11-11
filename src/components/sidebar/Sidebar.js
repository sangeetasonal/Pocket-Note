
import React, { useState, useEffect } from 'react';
import GroupList from '../grouplist/GroupList';
import NewGroup from '../newgroup/NewGroup';
import './Sidebar.css';

function Sidebar({ onGroupSelect, onGroupCreate }) {
  const [showPopup, setShowPopup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null); // Track the selected group

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(savedGroups);
  }, []);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const handleAddGroupClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCreateGroup = (group) => {
    const newGroups = [...groups, group];
    setGroups(newGroups);
    setShowPopup(false);
    onGroupCreate(group);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group); // Set the clicked group as selected
    onGroupSelect(group);
  };

  return (
    <div className="sidebar">
      <h1>Pocket Notes</h1>
      <GroupList
        groups={groups}
        onGroupClick={handleGroupClick}
        selectedGroup={selectedGroup} // Pass the selected group
      />
      <button className="add-group-btn" onClick={handleAddGroupClick}>+</button>

      {showPopup && (
        <div className="overlay" onClick={handleClosePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <NewGroup onCreateGroup={handleCreateGroup} onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
