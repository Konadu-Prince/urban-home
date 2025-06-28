import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
  const [user, setUser] = useState({});
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    // Fetch user profile
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: token }
        });
        const data = await res.json();
        setUser(data.user || {});
      } catch (err) {
        console.error('User fetch error:', err);
      }
    };

    // Fetch user-specific properties
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/properties/all', {
          headers: { Authorization: token }
        });
        const all = await res.json();
        const filtered = all.filter(p => p.ownerId?._id === user._id);
        setProperties(filtered);
      } catch (err) {
        console.error('Property fetch error:', err);
      }
    };

    fetchUser();
    if (user._id) {
      fetchProperties();
    }
  }, [navigate, user._id]); // ✅ Included navigate

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Urban Home</h2>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/upload-document">Upload ID</Link>
          <Link to="/add-property">Add Property</Link>
          <Link to="/properties">My Properties</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </aside>

      <main className="main">
        <header className="banner">
          <h1>Welcome Back, {user.fullName || 'User'} 👋</h1>
          <p>Email: {user.email}</p>
        </header>

        <div className="stats-grid">
          <div className="card">
            <h3>{properties.length}</h3>
            <p>Properties Posted</p>
          </div>
          <div className="card">
            <h3>{user.emailVerified ? "✅" : "❌"}</h3>
            <p>{user.emailVerified ? "ID Verified" : "Not Verified"}</p>
          </div>
        </div>

        <div className="actions">
          <Link to="/upload-document" className="upload-btn">📤 Upload ID Document</Link>
          <Link to="/add-property" className="upload-btn">🏠 Add Property</Link>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;
