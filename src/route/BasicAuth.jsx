import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Resources from "../pages/Resources/Resources";
import Feedback from "../pages/Feedback/Feedback";
import Contact from "../pages/Contact/Contact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resources-management" element={<Resources />} />
      <Route path="/feedback-survey" element={<Feedback />} />
      <Route path="/contact-form" element={<Contact/>} />
      
      
    </>
  )
);
