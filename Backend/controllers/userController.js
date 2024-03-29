const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config()

// const secretKey = "WorldPeaceIsMyMotto"

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET , { expiresIn: "3d" });
  };

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.login(email, password);
  
      // create token
      const token = createToken(user._id);
      const name = user.name;
  
      res.status(200).json({ email, name, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// signup user
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const user = await User.register(name, email, password, confirmPassword);

    // create token
    const token = createToken(user._id);
    const id = user._id;

    res.status(200).json({ email, name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, registerUser };
