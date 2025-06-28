import React, { useEffect, useState } from 'react';
import './AdminDashboardTable.css';

const AdminDashboardTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/users', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => setUsers(data.users || []))
      .catch(err => console.error(err));
  }, []);

  const handleBlockToggle = (id, isBlocked) => {
    fetch(`http://localhost:5000/api/admin/${isBlocked ? 'unblock-user' : 'block-user'}/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(() => window.location.reload());
  };

  return (
    <div className="admin-table-container">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Verification</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.userType}</td>
              <td>{u.verificationStatus || 'pending'}</td>
              <td>{u.isBlocked ? 'Blocked' : 'Active'}</td>
              <td>
                <button
                  className="block-btn"
                  onClick={() => handleBlockToggle(u._id, u.isBlocked)}
                >
                  {u.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboardTable;
