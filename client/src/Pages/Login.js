import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import "./Login.css";
import Axios from "axios";
import { Navigate } from "react-router-dom";

// React class component that displays the page where users can login to their account.
// Posts entered login values to API. Redirects to NewsFeed if already loged in.
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "", // String value in username field
      password: "", // String value in password field
      message: "", // Error display message
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Posts login info to API. If information is correct sets local storage values
  // otherwise prints error message
  login(event) {
    event.preventDefault();
    Axios.post("http://localhost:5000/user/login", {
      username: this.state.username,
      password: this.state.password,
    }).then((response) => {
      if (response.data.loggedIn) {
        console.log(response);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("userID", response.data.userID);
        this.forceUpdate();
      } else {
        localStorage.setItem("loggedIn", false);
        this.setState({
          message: response.data.message,
        });
      }
    });
  }

  // Updates component state when each field is changed
  handleChange(event) {
    switch (event.target.id) {
      case "usernameLogin":
        this.setState({
          username: event.target.value,
        });
        break;
      case "passwordLogin":
        this.setState({
          password: event.target.value,
        });
        break;
      default:
      // do nothing
    }
  }

  render() {
    return (
      <div className="login">
        {/* If not logged in redirect to login page */}
        {localStorage.loggedIn === "true" && <Navigate to="/" replace={true} />}
        <Navbar />
        <h1>Login</h1>
        <form className="loginForm">
          <div className="formGroup">
            <input
              required
              id="usernameLogin"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <label htmlFor="usernameLogin">Username</label>
          </div>
          <div className="formGroup">
            <input
              required
              id="passwordLogin"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <label htmlFor="passwordLogin">Password</label>
          </div>
          <button onClick={this.login}>Login</button>
          <h2 style={{ color: "red" }}>{this.state.message}</h2>
        </form>
        <footer>
          <p>©Sam Mlawer 2022</p>
        </footer>
      </div>
    );
  }
}

export default Login;
