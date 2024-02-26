/* ------ Packages ------- */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

/* ----- Routes ----- */
const taskRoutes = require("./routes/tasks.js");
const userRoutes = require("./routes/user.js");

/* ------ Middleware ----- */
app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

/* -------- Server State API -------- */
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

/* ----- Connection to MongoDB ----- */
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    // Listening for req
    app.listen(PORT, (req, res) => {
      console.log(`connected to db and running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
