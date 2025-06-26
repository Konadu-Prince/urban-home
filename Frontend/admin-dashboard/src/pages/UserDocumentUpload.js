// src/pages/UserDocumentUpload.js

import React, { useState } from 'react';
import './UserDocumentUpload.css';

const UserDocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return setMessage('Please select a file.');

    const formData = new FormData();
    formData.append('document', file);

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/verify/upload', {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Upload successful!');
      } else {
        setMessage(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Verification Document</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default UserDocumentUpload;
