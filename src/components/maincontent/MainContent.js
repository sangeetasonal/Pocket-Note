// src/components/maincontent/MainContent.js
import React from 'react';
import NoteArea from '../notearea/NoteArea';
import backgroundImg from '../../assets/images/bg-image.png';
import lockIcon from '../../assets/images/Vector.png';
import './MainContent.css';

function MainContent({ selectedGroup }) {
  return (
    <div className="right-content">
      {selectedGroup ? (
        <NoteArea selectedGroup={selectedGroup} />
      ) : (
        <div className="default-view">
          <div className="illustration">
            <img src={backgroundImg} alt="main illustration" loading="eager" />
          </div>

          <div className="app-info">
            <h1>Pocket Notes</h1>
          </div>

          <div className="other-info">
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          </div>

          <div className="encryption-notice">
            <img src={lockIcon} alt="lock icon" className="lock-icon" />
            <p>End-to-end encrypted</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;
