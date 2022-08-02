// MySQL database connection

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gordo987",
  database: "SocialMedia",
});

module.exports = db;
