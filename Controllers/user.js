const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SecretKey, { expiresIn: maxAge });
};

const handleErrors = (err) => {
  let errors = { authorName: " ", authEmail: " ", authPasswd: " " };
  if (err.code === 11000) {
    if (err.message.includes("authorName")) {
      errors["authorName"] = "Author name is not unique";
    }
    if (err.message.includes("authEmail")) {
      errors["authEmail"] = "Email already Exist";
    }
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((properties) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//sign-up
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    const token = createToken(newUser._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.status(201).json({ user: newUser._id, message: "User Added" });
  } catch (err) {
    const error = handleErrors(err);
    res.status(500).json({ error, message: "Internal Server Error" });
  }
};

//getUsers
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get Perticular User
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//deleteUser
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//updateUser
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(result);
  } catch (err) {
    const error = handleErrors(err);
    res.status(500).json({ error, message: "Internal Server Error" });
  }
};

//Login
const userLogin = async (req, res) => {
  try {
    const { authEmail, authPasswd } = req.body;
    const user = await User.findOne({ authEmail });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const isPasswordValid = await bcrypt.compare(authPasswd, user.authPasswd);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res
      .status(200)
      .json({ message: "Login Successful", authorName: user.authorName });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  console.log("I'm invoked");
  res.cookie("jwt", " ", { maxAge: 1, httpOnly: true });
  res.redirect("/");
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  userLogin,
  logout,
};
