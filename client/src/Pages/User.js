import React from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import NewsFeed from "../Components/NewsFeed";

// React functional component that displays user profile
const User = () => {
  // Get userID from input parameters
  const { id } = useParams();

  return (
    <div className="userProfile">
      <Navbar />
      <section className="content">
        <div className="profile"></div>

        <NewsFeed id={id} />
      </section>
      <footer>
        <p>©Sam Mlawer 2022</p>
      </footer>
    </div>
  );
};

export default User;
