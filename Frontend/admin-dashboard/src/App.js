// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import AdminDashboard from './pages/AdminDashboard';
import AdminLogs from './pages/AdminLogs';
import BlockedUsers from './pages/BlockedUsers';
import DocumentUpload from './pages/DocumentUpload';
import UserDocumentUpload from './pages/UserDocumentUpload';
import UserDashboard from './pages/UserDashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <>
        <Routes>
          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/admin/blocked-users" element={<BlockedUsers />} />
          <Route path="/admin/upload-document" element={<DocumentUpload />} />

          {/* USERS ROUTES */}
          <Route path="/" element={<UserDashboard />} />
          <Route path="/upload-document" element={<UserDocumentUpload />} />

          {/* AUTH ROUTES */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* CATCH-ALL (Should be last!) */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </Router>
  );
}

export default App;
