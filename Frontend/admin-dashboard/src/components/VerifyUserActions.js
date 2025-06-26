import React, { useEffect, useState } from 'react';

const VerifyUserActions = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/all', {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        const filtered = data.users?.filter(user =>
          user.verificationStatus === 'pending'
        );
        setUsers(filtered || []);
      })
      .catch(err => console.error(err));
  }, [token]);

  async function handleVerify(userId, action) {
    const endpoint =
      action === 'approve'
        ? `http://localhost:5000/api/admin/verify-user/${userId}/approve`
        : `http://localhost:5000/api/admin/verify-user/${userId}/reject`;

    const res = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        Authorization: token
      }
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setUsers(users.filter(u => u._id !== userId));
    } else {
      alert(data.message);
    }
  }

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Pending Verifications</h2>
      {users.length === 0 ? (
        <p>No pending verifications</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>National ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.nationalID}</td>
                <td>
                  <button
                    style={{ marginRight: '10px', background: 'green' }}
                    onClick={() => handleVerify(user._id, 'approve')}
                  >
                    Approve
                  </button>
                  <button
                    style={{ background: 'crimson' }}
                    onClick={() => handleVerify(user._id, 'reject')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VerifyUserActions;
