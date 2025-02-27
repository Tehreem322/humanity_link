import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Resources from "../pages/Resources/Resources";
import HelpRequestResources from "../pages/Resources/HelpRequestResource";
import HelpRequestForm from "../pages/Resources/HelpRequestForm";
import Feedback from "../pages/Feedback/Feedback";
import Contact from "../pages/Contact/Contact";
import Chat from "../pages/Chat/Chat";
import Profile from "../pages/Profile/Profile";
import ProfileInfo from "../pages/Profile/ProfileInfo";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/dashboards" element={<Dashboard />} />
      <Route path="/Users" element={<Dashboard />} />
      <Route path="/help-form" element={<HelpRequestForm />} />
      <Route path="/help-request" element={<HelpRequestResources />} />
      <Route path="/resources-management" element={<Resources />} />
      <Route path="/chat" element={<Chat/>} />
      <Route path="/feedback-survey" element={<Feedback />} />
      <Route path="/dashboard" element={<Feedback />} />
      <Route path="/contact-form" element={<Contact/>} />
      <Route path="/profile-edit" element={<Profile />} />
      <Route path="/profile-info" element={<ProfileInfo/>} />
      
      
    </>
  )
);
