import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import "./Upload.css";
import Axios from "axios";
import { Navigate } from "react-router-dom";

// React class component that where user can write a post and uplaod it
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: "", // String text of the user's post
      didUpload: false, // Boolean value. True after user uploads post so page can redirect
    };
    this.handleChange = this.handleChange.bind(this);
    this.upload = this.upload.bind(this);
  }

  // Sends post to backend
  upload(event) {
    event.preventDefault();
    Axios.post("http://localhost:5000/post/upload", {
      postText: this.state.postText,
      userID: localStorage.getItem("userID"),
    }).then((response) => {
      this.setState({
        didUpload: true,
      });
      this.forceUpdate();
    });
  }

  // On change function that updates state when text area string is changed
  handleChange(event) {
    this.setState({
      postText: event.target.value,
    });
  }

  render() {
    return (
      <div className="upload">
        {this.state.didUpload && <Navigate to="/" replace={true} />}
        <Navbar />
        <h1>Upload</h1>
        <form className="uploadForm">
          <div className="formGroup">
            <textarea
              required
              autoFocus
              id="uploadContent"
              placeholder="Write your post here..."
              maxLength="200"
              rows="15"
              cols="50"
              onChange={this.handleChange}
              value={this.state.postText}
            />
          </div>
          <button type="submit" onClick={this.upload}>
            Upload
          </button>
        </form>

        <footer>
          <p>©Sam Mlawer 2022</p>
        </footer>
      </div>
    );
  }
}

export default Upload;
