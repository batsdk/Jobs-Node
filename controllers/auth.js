const User = require("../models/User");

// Express Packages
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = jwt.sign({ userID: user._id, name: user.name }, "jwtsecret", {
    expiresIn: "30d",
  });

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send("User Login");
};

module.exports = { register, login };
