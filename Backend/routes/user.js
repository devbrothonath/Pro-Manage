const express = require("express");

const router = express.Router();

// controller
const {loginUser, registerUser} = require("../controllers/userController.js")

// signup route
router.post("/register", registerUser)
// login route
router.post("/login", loginUser)


module.exports = router