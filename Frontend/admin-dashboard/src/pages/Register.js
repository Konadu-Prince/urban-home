// src/pages/Register.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'renter',
    nationalID: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful! Check your email to verify.');
      } else {
        toast.error(data.message || 'Registration failed');
      }

    } catch (err) {
      toast.error('Server error');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <input name="nationalID" placeholder="National ID" onChange={handleChange} required />
        <select name="userType" onChange={handleChange}>
          <option value="renter">Renter</option>
          <option value="buyer">Buyer</option>
          <option value="owner">Owner</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>

    </div>
  );
}

export default Register;
