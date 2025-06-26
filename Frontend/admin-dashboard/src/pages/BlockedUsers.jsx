// src/pages/BlockedUsers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlockedUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBlocked = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/blocked-users', {
          headers: { Authorization: token }
        });
        setUsers(res.data.blockedUsers);
      } catch (err) {
        console.error('Failed to fetch blocked users:', err.message);
      }
    };
    fetchBlocked();
  }, []);

  return (
    <div className="p-4">
      <h2>Blocked Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.fullName} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default BlockedUsers;
