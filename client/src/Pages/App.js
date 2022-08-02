import "./App.css";
// import Post from "../Components/Post";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import React from "react";
import NewsFeed from "../Components/NewsFeed";

// React functional component that displays news feed if user is logged in
// Otherwise redirects to login page
const App = () => {
  // Hook to redirect page
  const navigate = useNavigate();

  // State variable that contains boolean value that states if users is logged in
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("loggedIn")
  );

  // Redirects to login page if not logged in
  React.useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
    if (loggedIn === "false") {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return (
    <div className="App">
      <Navbar />
      <section className="content">
        <div className="profile"></div>
        <NewsFeed />
      </section>
      <footer>
        <p>©Sam Mlawer 2022</p>
      </footer>
    </div>
  );
};

export default App;
