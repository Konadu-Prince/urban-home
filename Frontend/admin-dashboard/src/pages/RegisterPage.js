import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'renter',
    nationalID: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
      } else {
        setSuccess('Registration successful. Check your email to verify.');
        setTimeout(() => navigate('/login'), 2500);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <select name="userType" onChange={handleChange}>
          <option value="renter">Renter</option>
          <option value="buyer">Buyer</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
        </select>
        <input type="text" name="nationalID" placeholder="Ghana Card / License / Visa" required onChange={handleChange} />
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login here</a></p>

      </form>
    </div>
  );
};

export default RegisterPage;
