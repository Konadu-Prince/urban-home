// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Navigate } from 'react-router-dom';


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
import AddProperty from './pages/AddProperty';
import PropertyListings from './pages/PropertyListings';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EmailVerification from './pages/EmailVerification';
import PropertyGallery from './pages/PropertyGallery';
import ProfileSettings from './pages/ProfileSettings';
import AdminDashboardTable from './pages/AdminDashboardTable';
import EmailStatus from './pages/EmailStatus';
import PropertyFeed from './pages/PropertyFeed';

function App() {
  return (
    <Router>
      <Routes>
        {/* ADMIN ROUTES */}
        <Route path="*" element={<Navigate to="/ " />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/admin/blocked-users" element={<BlockedUsers />} />
        <Route path="/admin/upload-document" element={<DocumentUpload />} />
        

        {/* USER ROUTES */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/upload-document" element={<UserDocumentUpload />} />
        {/*  unused USER ROUTES */}
        <Route path="/register1" element={<Register />} />
        <Route path="/login1" element={<Login />} />
        <Route path="/verify-email/:token1" element={<VerifyEmail />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/properties" element={<PropertyListings />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route path="/property-gallery" element={<PropertyGallery />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/admin/dashboard" element={<AdminDashboardTable />} />
        <Route path="/email-status" element={<EmailStatus />} />
        <Route path="/properties" element={<PropertyFeed />} />

      </Routes>
    </Router>
  );
}

export default App;
