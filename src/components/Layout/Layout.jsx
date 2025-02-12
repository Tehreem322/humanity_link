import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Navbar/Sidebar";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
