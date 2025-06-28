import React, { useState } from 'react';
import './MessageModal.css';

function MessageModal({ onClose, ownerId }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Connect to your backend later
    alert(`Message sent to owner ID: ${ownerId}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h4>Send Message</h4>
        <textarea value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handleSend}>Send</button>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}

export default MessageModal;
