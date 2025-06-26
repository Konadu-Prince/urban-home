// src/pages/VerifyEmail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    fetch(`/api/auth/verify-email/${token}`)
      .then(res => res.json())
      .then(data => setMessage(data.message || 'Verification failed'))
      .catch(() => setMessage('Error verifying email'));
  }, [token]);

  return (
    <div className="auth-form">
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
}

export default VerifyEmail;
