// Main Express document

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Individual routes
const userRoute = require("./routes/User");
const postRoute = require("./routes/Post");
app.use("/user", userRoute);
app.use("/post", postRoute);

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("Server running on port 5000");
});
