import React, { Component } from "react";
import Axios from "axios";
import Post from "./Post";

// Functional component that displays newsfeeed to user
class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [], // List of all posts
      users: [], // List of users that created posts
    };
    this.getPosts = this.getPosts.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // Gets posts from database then returns them in reverse order to show newst posts first
  getPosts() {
    console.log("get");
    Axios.get("http://localhost:5000/post/newsfeed").then((response) => {
      this.setState({
        posts: response.data.reverse(),
      });
      return response;
    });
  }

  // If viewing a spcific user profile: only get posts from that user
  getProfile(id) {
    Axios.post("http://localhost:5000/user/profile", { id: id }).then(
      (response) => {
        this.setState({
          posts: response.data.reverse(),
        });
      }
    );
  }

  // Get posts on component render
  componentDidMount() {
    if (this.props.id) {
      this.getProfile(this.props.id);
    } else {
      this.getPosts();
    }
  }

  render() {
    // Create post component for each post from backend
    const data = this.state.posts.map((p, i) => {
      return <Post key={p.id} post={p} />;
    });

    return <div className="newsFeed">{data}</div>;
  }
}

export default NewsFeed;
