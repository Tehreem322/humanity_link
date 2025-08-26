import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Resources from "../pages/Resources/Resources";
import HelpRequestResources from "../pages/Resources/HelpRequestResource";
import HelpRequestForm from "../pages/Resources/HelpRequestForm";
import Feedback from "../pages/Feedback/Feedback";
import Contact from "../pages/Contact/Contact";
import Chat from "../pages/Chat/Chat";
import ChatOther from "../pages/Chat/ChatOthere";
import Profile from "../pages/Profile/Profile";
import ProfileInfo from "../pages/Profile/ProfileInfo";

// Common auth check
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return { token, role };
};

// Route for help_creator (chat + dashboard)
const HelpCreatorRoute = ({ children }) => {
  const { token, role } = isAuthenticated();
  if (!token || role !== 'help_creator') {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Route for admin (all except chat)
const AdminRoute = ({ children }) => {
  const { token, role } = isAuthenticated();
  if (!token || role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Route for dashboard (accessible to both roles)
const DashboardRoute = ({ children }) => {
  const { token, role } = isAuthenticated();
  const allowedRoles = ['admin', 'help_creator'];
  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
       <Route 
        path="/dashboard" 
        element={
            <Feedback />
        } 
      />
       <Route 
        path="/chat" 
        element={
            <Chat />
        } 
      />
         <Route 
        path="/resources-management" 
        element={
            <Resources />
        } 
      />
      <Route path="/chatOther/:userId" element={<ChatOther />} />
      {/* Chat route - only for help_creator */}
      {/* <Route 
        path="/chat" 
        element={
          <HelpCreatorRoute>
            <Chat />
          </HelpCreatorRoute>
        } 
      /> */}
      
      {/* Dashboard - accessible to both roles */}
      <Route 
        path="/dashboards" 
        element={
          <DashboardRoute>
            <Dashboard />
          </DashboardRoute>
        } 
      />
      
      {/* Admin-only routes */}
      <Route 
        path="/Users" 
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } 
      />
      <Route 
        path="/help-form" 
        element={
          <AdminRoute>
            <HelpRequestForm />
          </AdminRoute>
        } 
      />
      <Route 
        path="/help-creators" 
        element={
          <AdminRoute>
            <HelpRequestResources />
          </AdminRoute>
        } 
      />
      {/* <Route 
        path="/resources-management" 
        element={
          <AdminRoute>
            <Resources />
          </AdminRoute>
        } 
      /> */}
      <Route 
        path="/feedback-survey" 
        element={
          <AdminRoute>
            <Feedback />
          </AdminRoute>
        } 
      />
      <Route 
        path="/contact-form" 
        element={
          <AdminRoute>
            <Contact />
          </AdminRoute>
        } 
      />
      <Route 
        path="/profile-edit/:id" 
        element={
          <AdminRoute>
            <Profile />
          </AdminRoute>
        } 
      />
      <Route 
        path="/profile-info" 
        element={
          <AdminRoute>
            <ProfileInfo />
          </AdminRoute>
        } 
      />
    </>
  )
);