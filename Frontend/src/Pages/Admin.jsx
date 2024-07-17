import React from "react";
import "./CSS/Admin.css";
import logo from "../Components/Assets/nova-logo.png";

export const Admin = () => {
  return (
    <div className="main-container">
      <nav className="NavBar">
        <div className="logo-container">
          <img src={logo} className="logo" alt="Logo" />
          <p className="Admin-name">Admin Pannel</p>
        </div>
      </nav>
      <div className="aside-container">
        <aside className="aside-left"></aside>
        <aside className="aside-right"></aside>
      </div>
    </div>
  );
};
