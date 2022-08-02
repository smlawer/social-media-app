import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

// React functional component  displays Navbar at top of screen
const Navbar = () => {
  const navigate = useNavigate();
  const logState = localStorage.getItem("loggedIn");

  // Function that logs out user by setting local storage variables to false
  const logout = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("username", false);
    localStorage.setItem("userID", false);
    navigate("/login");
  };

  // Buttons to display when user is not logged in
  const notLogged = (
    <div>
      <li className="liRight">
        <a href="/login">Login</a>
      </li>
      <li className="liRight">
        <a href="/register">Register</a>
      </li>
    </div>
  );

  // Buttons to display when user is logged in
  const isLogged = (
    <div>
      <li className="liLeft">
        <a href={`/users/${localStorage.userID}`}>My Profile</a>
      </li>
      <li className="liLeft">
        <a href="/upload">Upload</a>
      </li>
      <li className="liRight">
        <button onClick={logout}>Logout</button>
      </li>
    </div>
  );

  return (
    <nav className="navBar">
      <ul className="navList">
        <li className="liLeft">
          <a href="/">Home</a>
        </li>
        {logState === "false" && notLogged}
        {logState === "true" && isLogged}
      </ul>
    </nav>
  );
};

export default Navbar;
