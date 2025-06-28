import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EmailVerification.css';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/verify-email/${token}`);
        const data = await res.json();

        if (res.ok) {
          setMessage('Your email has been verified. You can now log in.');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setError(data.message || 'Verification failed.');
        }
      } catch (err) {
        setError('An error occurred during verification.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="verify-container">
      <h2>Email Verification</h2>
      {error ? <p className="error-msg">{error}</p> : <p className="success-msg">{message}</p>}
    </div>
  );
};

export default EmailVerification;
