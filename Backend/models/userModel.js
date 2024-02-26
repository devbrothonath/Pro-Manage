const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  // Check if the password and confirmPassword match
  if (this.isModified("password") || this.isNew) {
    if (this.password !== this.confirmPassword) {
      throw new Error("Password doesn't match");
    }

    // bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    this.confirmPassword = undefined; // Clear confirmPassword field after validation
  }

  next();
});

// static register method
userSchema.statics.register = async function (
  name,
  email,
  password,
  confirmPassword
) {
  // validation
  if (!name || !email || !password || !confirmPassword) {
    throw Error("All fields must be filled");
  }
  if (!validator.isAlpha(name)) {
    throw Error("Name cannot have spaces and only letters");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exists");
  }

  const user = await this.create({ name, email, password, confirmPassword });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
