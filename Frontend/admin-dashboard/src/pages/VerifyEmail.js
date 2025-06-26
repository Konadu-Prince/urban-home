import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email/${token}`);
        const data = await res.json();
        if (res.ok) {
          toast.success(data.message || 'Email verified!');
          navigate('/login');
        } else {
          toast.error(data.message || 'Invalid or expired token');
        }
      } catch (err) {
        toast.error('Server error during verification');
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="form-container">
      <h2>Verifying your email...</h2>
    </div>
  );
}

export default VerifyEmail;
