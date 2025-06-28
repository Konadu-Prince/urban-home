// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import UserDashboard from './pages/UserDashboard';
import AddProperty from './pages/AddProperty';
import PropertyFeed from './pages/PropertyFeed';
import PropertyListings from './pages/PropertyListings';
import PropertyGallery from './pages/PropertyGallery';
import ProfileSettings from './pages/ProfileSettings';
import EmailStatus from './pages/EmailStatus';
import UserDocumentUpload from './pages/UserDocumentUpload';

import AdminDashboard from './pages/AdminDashboard';
import AdminLogs from './pages/AdminLogs';
import AdminDashboardTable from './pages/AdminDashboardTable';
import BlockedUsers from './pages/BlockedUsers';
import DocumentUpload from './pages/DocumentUpload';

// DEV Legacy Routes
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* 👤 User Routes */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/user/upload-document" element={<UserDocumentUpload />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/properties" element={<PropertyFeed />} />
        <Route path="/properties/all" element={<PropertyListings />} />
        <Route path="/property-gallery" element={<PropertyGallery />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/email-status" element={<EmailStatus />} />

        {/* 🛡 Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboardTable />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/admin/blocked-users" element={<BlockedUsers />} />
        <Route path="/admin/upload-document" element={<DocumentUpload />} />

        {/* 🔧 Legacy or backup routes */}
        <Route path="/register1" element={<Register />} />
        <Route path="/login1" element={<Login />} />
        <Route path="/verify-email/:token1" element={<VerifyEmail />} />

        {/* 🚨 Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
