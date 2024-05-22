import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/menu.css";
import logo from "../images/ontario-logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let handleLogOut = () => {
    localStorage.setItem("user", "");
    navigate("/login");
  };
  return (
    <header className="topbar-menu">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link
              to="/profile"
              className={location.pathname === "/profile" ? "active-link" : ""}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/activities"
              className={
                location.pathname === "/activities" ? "active-link" : ""
              }
            >
              Activities
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={location.pathname === "/services" ? "active-link" : ""}
            >
              Add Services
            </Link>
          </li>
        </ul>
      </nav>
      <div className="logout-button">
        <button onClick={handleLogOut}>Log out</button>
      </div>
    </header>
  );
};

export default Navbar;
