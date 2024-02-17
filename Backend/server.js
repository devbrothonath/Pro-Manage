/* ------ Packages ------- */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

/* ----- Routes ----- */
const taskRoutes = require("./routes/tasks.js");

/* ------ Middleware ----- */
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes)

/* ----- Server State API ----- */
const serverState = "active";
app.get("/server-state", (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  if (serverState == "active") {
    res
      .status(200)
      .json({ servername: "Pro Manage Server", currentTime, serverState });
  } else {
    res
      .status(500)
      .json({ servername: "Pro Manage Server", currentTime, serverState });
  }
});

/* ----- Connecting to MongoDB ----- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log("server running");
});
