import React, { Component } from "react";
import Axios from "axios";
import "./Post.css";

// Class component that displays an individual comment
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}, // User object that posted comment
    };
    this.getUser = this.getUser.bind(this);
  }

  // Gets user data from userID
  getUser() {
    Axios.post("http://localhost:5000/user/userfromid", {
      userID: this.props.comment.userID,
    }).then((response) => {
      this.setState({
        user: response.data[0],
      });
    });
  }

  // Gets user data when component is first rendered
  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <div className="comment">
        <div className="commentHeader">
          <p className="commentName">{this.state.user.name}</p>
          <p className="commentHandle">@{this.state.user.username}</p>
        </div>
        <p className="commentContent">{this.props.comment.commentText}</p>
      </div>
    );
  }
}

export default Comment;
