import "./Post.css";
import Axios from "axios";
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpReg,
  faCommentDots as faCommentDotsReg,
} from "@fortawesome/free-regular-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import React, { Component } from "react";

// React class component that shows individual post in news feed
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}, // User object that posted
      numLikes: 0, // Number of likes on post
      userLikes: false, // if logged in user liked post
      numComments: 0, // Number of comments on post
      comments: [], // Array of comments on post
      showComments: false, // If comments are currently being shown
      linkHoverStyle: "none", // Text decoration style of name. Used to underline when hovered
      currComment: "", // Comment being written
    };
    this.getUser = this.getUser.bind(this);
    this.getLikes = this.getLikes.bind(this);
    this.getComments = this.getComments.bind(this);
    this.likePost = this.likePost.bind(this);
    this.showCommentSection = this.showCommentSection.bind(this);
    this.addComment = this.addComment.bind(this);
    this.editComment = this.editComment.bind(this);
  }

  // Gets likes for the Post
  getLikes() {
    Axios.get("http://localhost:5000/post/likes", {
      params: {
        postID: this.props.post.id,
      },
    }).then((response) => {
      // Determine if user liked current post
      const val = parseInt(localStorage.userID);
      response.data.every((elem) => {
        if (elem.userID === val) {
          this.setState({
            userLikes: true,
          });
          return false;
        }
        return true;
      });

      this.setState({
        numLikes: response.data.length,
      });
    });
  }

  // Gets comments for the Post
  getComments() {
    Axios.get("http://localhost:5000/post/comments", {
      params: {
        postID: this.props.post.id,
      },
    }).then((response) => {
      this.setState({
        numComments: response.data.length,
        comments: response.data,
      });
    });
  }

  // Gets user data from userID
  getUser() {
    Axios.post("http://localhost:5000/user/userfromid", {
      userID: this.props.post.userID,
    }).then((response) => {
      // console.log(response.data);
      this.setState({
        user: response.data[0],
      });
    });
  }

  // On click callback for like button, likes or unlikes the post
  likePost() {
    if (this.state.userLikes) {
      // if user previously liked post

      Axios.delete("http://localhost:5000/post/likes", {
        data: {
          postID: this.props.post.id,
          userID: localStorage.userID,
        },
      }).then(
        this.setState((state) => ({
          numLikes: (state.numLikes -= 1),
          userLikes: false,
        }))
      );
    } else {
      // If haven't previously liked
      Axios.post("http://localhost:5000/post/likes", {
        postID: this.props.post.id,
        userID: localStorage.userID,
      }).then(
        this.setState((state) => ({
          numLikes: (state.numLikes += 1),
          userLikes: true,
        }))
      );
    }
  }

  // On click event for comments div, shows or unshows comments section if there are comments
  showCommentSection() {
    if (this.state.showComments) {
      // if comments already shown -> close comment section
      this.setState({
        showComments: false,
      });
    } else {
      // if not shown
      this.setState({
        showComments: true,
      });
    }
    // this.forceUpdate();
  }

  // On click event for comment button. Sends comment to backend
  addComment(event) {
    event.preventDefault();
    if (this.state.currComment.length > 0) {
      Axios.post("http://localhost:5000/post/comments", {
        comment: this.state.currComment,
        userID: localStorage.userID,
        postID: this.props.post.id,
      }).then((response) => {
        // console.log(response);
        this.setState({
          currComment: "",
        });
        this.getComments();
      });
    }
  }

  // On change function for comment text field that updates state of currComment
  editComment(event) {
    if (this.state.currComment.length < 100) {
      this.setState({
        currComment: event.target.value,
      });
    }
  }

  // Gets data from backend on render
  componentDidMount() {
    this.getUser();
    this.getLikes();
    this.getComments();
  }

  render() {
    // Conver sql date into JS Date object
    const d = new Date(this.props.post.date);

    // Preps comments if they exist
    let comments = [];
    if (this.state.comments.length > 0) {
      comments = this.state.comments.map((elem) => {
        return <Comment comment={elem} key={elem.id} />;
      });
    }
    comments.push(
      <form className="addComment">
        <textarea
          type="text"
          placeholder="Write your comment here..."
          className="addCommentInput"
          onChange={this.editComment}
          value={this.state.currComment}
        />
        <button className="addCommentSubmit" onClick={this.addComment}>
          Comment
        </button>
      </form>
    );

    return (
      <div className="postBox">
        <div className="postHeader">
          {/* Displays poster user data */}
          <img
            src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            className="postThumbnail"
            alt="Profile Im"
          />
          <div className="postName">
            <Link
              to={`/users/${this.state.user.id}`}
              style={{
                color: "black",
                margin: 0,
                textAlign: "left",
                fontWeight: "bold",
                textDecoration: this.state.linkHoverStyle,
              }}
              onMouseEnter={() =>
                this.setState({
                  linkHoverStyle: "underline",
                })
              }
              onMouseLeave={() =>
                this.setState({
                  linkHoverStyle: "none",
                })
              }
            >
              {this.state.user.name}
            </Link>
            <h5>@{this.state.user.username}</h5>
          </div>
          <div className="postDate">
            <h5>{d.toLocaleString("en-US", { timeZone: "EST" })}</h5>
          </div>
        </div>
        <div className="postText">
          <h2>{this.props.post.content}</h2>
        </div>
        <div className="postFooter">
          {/* Contains Likes and Comments */}
          <div id="likesDiv" onClick={this.likePost}>
            {this.state.userLikes ? (
              <FontAwesomeIcon icon={faThumbsUp} size="2x" color="#B14F7A" />
            ) : (
              <FontAwesomeIcon icon={faThumbsUpReg} size="2x" color="black" />
            )}

            <h3>{this.state.numLikes} Likes</h3>
          </div>
          <div id="commentsDiv" onClick={this.showCommentSection}>
            {this.state.showComments ? (
              <FontAwesomeIcon icon={faCommentDots} size="2x" color="#B14F7A" />
            ) : (
              <FontAwesomeIcon
                icon={faCommentDotsReg}
                size="2x"
                color="black"
              />
            )}
            <h3>{this.state.numComments} Comments</h3>
          </div>
        </div>
        {/* Display comments when boolean value is true */}
        {this.state.showComments && (
          <div className="commentSection">{comments}</div>
        )}
      </div>
    );
  }
}

export default Post;
