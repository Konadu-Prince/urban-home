import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="user-dashboard">
      <h2>Welcome, User!</h2>
      <button onClick={() => navigate('/user/upload-document')}>Upload ID Document</button>
    </div>
  );
};

export default UserDashboard;
