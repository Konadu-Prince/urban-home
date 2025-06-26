import React, { useState } from 'react';
import axios from 'axios';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setStatus('Please select a file');

    const formData = new FormData();
    formData.append('document', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/verify/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setStatus(res.data.message);
    } catch (err) {
      setStatus('Upload failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 border rounded">
      <h2 className="text-lg font-semibold mb-4">Upload Document for Verification</h2>

      <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default DocumentUpload;
