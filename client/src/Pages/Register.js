import React, { Component } from "react";
import "./Register.css";
import Navbar from "../Components/Navbar";
import Axios from "axios";
import { Navigate } from "react-router-dom";

// React class component that displays the page where users can register accounts.
// Checks for valid inputs then posts data to User API route.
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "", // String value in name field
      username: "", // String value in username field
      password: "", // String value in password field
      confirmPassword: "", // String value in confirm password field
      registered: false, // Boolean value. Becomes true after user registers so page can redirect to login
      message: "", // Error display message
    };
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  // Check inputs then post new account to API
  register(event) {
    event.preventDefault();
    // If inputs are invalid
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        message: "Passwords must match",
      });
      return;
    } else if (this.state.name.length < 3) {
      this.setState({
        message: "Name is too short",
      });
    } else if (this.state.username.length < 3) {
      this.setState({
        message: "Username is too short",
      });
    }
    // Register user
    else
      Axios.post("http://localhost:5000/user/register", {
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
      }).then((response) => {
        if (response.data === "") {
          this.setState({
            message: "Username is already taken",
          });
        } else {
          console.log(response);
          this.setState({
            registered: true,
          });
          this.forceUpdate();
        }
      });
  }

  // Updates component state when each field is changed
  handleChange(event) {
    switch (event.target.id) {
      case "nameField":
        this.setState({
          name: event.target.value,
        });
        break;
      case "usernameField":
        this.setState({
          username: event.target.value,
        });
        break;
      case "passwordField":
        this.setState({
          password: event.target.value,
        });
        break;
      case "confirmPasswordField":
        this.setState({
          confirmPassword: event.target.value,
        });
        break;
      default:
      // do nothing
    }
  }

  render() {
    return (
      <div className="register">
        {/* Redirects to login page after registering */}
        {this.state.registered && <Navigate to="/login" replace={true} />}{" "}
        <Navbar />
        <h1>Register</h1>
        <form className="registerForm">
          <div className="formGroup">
            <input
              required
              id="nameField"
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="nameField">Name</label>
          </div>
          <div className="formGroup">
            <input
              required
              id="usernameField"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <label htmlFor="usernameField">Username</label>
          </div>
          <div className="formGroup">
            <input
              required
              id="passwordField"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <label htmlFor="passwordField">Password</label>
          </div>
          <div className="formGroup">
            <input
              required
              id="confirmPasswordField"
              type="password"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <label htmlFor="confirmPasswordField">Confirm Password</label>
          </div>
          <button type="submit" onClick={this.register}>
            Register
          </button>
          <h2 style={{ color: "red" }}>{this.state.message}</h2>
        </form>
        <footer>
          <p>©Sam Mlawer 2022</p>
        </footer>
      </div>
    );
  }
}

export default Register;
