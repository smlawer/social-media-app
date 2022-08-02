// Express route that contains all API calls that act on the users DB table

const express = require("express");
const router = express.Router();
const db = require("../config/db");

// API post that creates a new user in the Users table
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  db.query(
    "INSERT INTO Users (username,password,name) VALUES (?,?,?)",
    [username, password, name],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});

// API post that checks if input values are in Users table and logs in usr if correct
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM Users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results[0]) {
        if (password === results[0].password) {
          res.json({
            loggedIn: true,
            username: username,
            userID: results[0].id,
          });
        } else {
          res.json({
            loggedIn: false,
            message: "Wrong username and/or password",
          });
        }
      } else {
        res.json({
          loggedIn: false,
          message: "Wrong username and/or password",
        });
      }
      // res.send(results);
    }
  );
});

// API post that gets the row in Users table with input ID
router.post("/userfromid", (req, res) => {
  db.query(
    "SELECT * from Users WHERE id = ?",
    [req.body.userID],
    (err, results) => {
      // console.log(err);
      res.send(results);
    }
  );
});

// API post that gets all posts for a input userID
router.post("/profile", (req, res) => {
  db.query(
    "SELECT * from Posts WHERE userID = ?",
    [req.body.id],
    (err, results) => {
      res.send(results);
    }
  );
});

module.exports = router;
