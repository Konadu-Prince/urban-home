import React from 'react';
import BlockedUsersTable from '../components/BlockedUsersTable';
import VerifyUserActions from '../components/VerifyUserActions';

const AdminDashboard = () => {
  const token = localStorage.getItem('admin-token');

  if (!token) {
    return <p>Please login as admin</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Urban Home Admin Dashboard</h1>
      <BlockedUsersTable token={token} />
      <VerifyUserActions token={token} />
      <a href="/properties">View Properties</a>
    </div>
  );
};

export default AdminDashboard;
