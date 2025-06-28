import React from 'react';
import './EmailStatus.css';
import { useLocation } from 'react-router-dom';

const EmailStatus = () => {
  const location = useLocation();
  const status = new URLSearchParams(location.search).get('status');

  return (
    <div className="email-status-container">
      <div className="email-status-card">
        {status === 'success' ? (
          <>
            <h2>Email Verified ✅</h2>
            <p>Your account is now active. You can login and enjoy full features.</p>
          </>
        ) : (
          <>
            <h2>Verify Your Email 📩</h2>
            <p>We’ve sent a link to your email. Please click it to complete your registration.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailStatus;
