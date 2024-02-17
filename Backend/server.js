/* ------ Packages ------- */
const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")


const app = express();

/* ------ Middleware ----- */
app.use(cors())

app.get("/", (req, res) => {
    res.json({ message: "mr. server here"})
})

app.listen(5000, (req,res) => {
    console.log("server running")
})