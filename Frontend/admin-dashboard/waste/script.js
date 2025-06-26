// Replace with your real backend URL
const API = 'http://localhost:5000/api/admin';
const token = localStorage.getItem('token'); // or hardcode for now

// Fetch blocked users
async function fetchBlockedUsers() {
  const res = await fetch(`${API}/blocked-users`, {
    headers: { Authorization: token },
  });
  const data = await res.json();
  populateTable(data.blockedUsers);
}

function populateTable(users) {
  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${user.fullName}</td>
      <td>${user.email}</td>
      <td>${user.isBlocked ? 'Yes' : 'No'}</td>
      <td>${user.verificationStatus || 'pending'}</td>
      <td>
        ${user.isBlocked ? `<button class="unblock-btn" onclick="unblockUser('${user._id}')">Unblock</button>` : ''}
        ${user.verificationStatus === 'pending' ? `
          <button class="approve-btn" onclick="approveUser('${user._id}')">Approve</button>
          <button class="reject-btn" onclick="rejectUser('${user._id}')">Reject</button>
        ` : ''}
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Action buttons
async function unblockUser(id) {
  await fetch(`${API}/unblock-user/${id}`, {
    method: 'PUT',
    headers: { Authorization: token },
  });
  fetchBlockedUsers();
}

async function approveUser(id) {
  await fetch(`${API}/verify-user/${id}/approve`, {
    method: 'PUT',
    headers: { Authorization: token },
  });
  fetchBlockedUsers();
}

async function rejectUser(id) {
  await fetch(`${API}/verify-user/${id}/reject`, {
    method: 'PUT',
    headers: { Authorization: token },
  });
  fetchBlockedUsers();
}

// Init
fetchBlockedUsers();
