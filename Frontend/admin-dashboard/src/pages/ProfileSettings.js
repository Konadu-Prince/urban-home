import React, { useState } from 'react';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    profileImage: null
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    setForm(prev => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Profile updated!');
    // Send form to backend via fetch/axios
  };

  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Full Name
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          New Password
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </label>

        <label>
          Profile Picture
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </label>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileSettings;
