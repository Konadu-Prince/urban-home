// src/pages/Register.js
import React, { useState } from 'react';

function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'renter',
    nationalID: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message || 'Registered!');
    } catch (err) {
      console.error(err);
      setMessage('Error during registration.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="nationalID" placeholder="National ID" onChange={handleChange} required />
        <select name="userType" onChange={handleChange}>
          <option value="renter">Renter</option>
          <option value="owner">Owner</option>
          <option value="buyer">Buyer</option>
        </select>
        <button type="submit">Register</button>
      </form>
      
      <p>{message}</p>
    </div>
  );
}

export default Register;
