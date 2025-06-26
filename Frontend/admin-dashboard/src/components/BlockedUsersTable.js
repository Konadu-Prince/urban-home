import React, { useEffect, useState } from 'react';

const BlockedUsersTable = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/blocked-users', {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => setUsers(data.blockedUsers))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h2>Blocked Users</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleUnblock(user._id)}
                >
                  Unblock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  async function handleUnblock(userId) {
    const res = await fetch(`http://localhost:5000/api/admin/unblock-user/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: token
      }
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setUsers(users.filter(u => u._id !== userId)); // Update table
    } else {
      alert(data.message);
    }
  }
};

export default BlockedUsersTable;
