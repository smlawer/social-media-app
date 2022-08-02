// Express route that contains all API calls that have to do with user uploads

const express = require("express");
const router = express.Router();
const db = require("../config/db");

// API call that posts user upload to Posts table
router.post("/upload", (req, res) => {
  const postText = req.body.postText;
  const userID = req.body.userID;
  db.query(
    "INSERT INTO Posts (userID,content, date) VALUES (?,?,?)",
    [userID, postText, new Date().toISOString().slice(0, 19).replace("T", " ")],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});

// API call that gets all rows from Posts table
router.get("/newsfeed", (req, res) => {
  db.query("SELECT * from Posts", (err, results) => {
    // console.log(err);
    res.send(results);
  });
});

// API call that gets all likes for a certain postID
router.get("/likes", (req, res) => {
  db.query(
    "SELECT * from Likes WHERE postID=?",
    [req.query.postID],
    (err, results) => {
      res.send(results);
    }
  );
});

// API call that deletes a row from Likes table
router.delete("/likes", (req, res) => {
  db.query("DELETE FROM Likes WHERE postID = ? AND userID = ?", [
    req.body.postID,
    req.body.userID,
  ]);
});

// API call that adds a row to Likes table
router.post("/likes", (req, res) => {
  db.query(
    "INSERT INTO Likes (postID,userID) VALUES (?,?)",
    [req.body.postID, req.body.userID],
    (err, results) => {
      res.send(results);
    }
  );
});

// API call that gets all Comments for a certain PostID
router.get("/comments", (req, res) => {
  db.query(
    "SELECT * from Comments WHERE postID=?",
    [req.query.postID],
    (err, results) => {
      res.send(results);
    }
  );
});

// API call that posts a new row to Comment table
router.post("/comments", (req, res) => {
  db.query(
    "INSERT INTO Comments (userID,postID,commentText) VALUES (?,?,?)",
    [req.body.userID, req.body.postID, req.body.comment],
    (err, results) => {
      res.send(results);
    }
  );
});

module.exports = router;
