const User = require("../models/User");
const {
  BadRequestError,
  unauthenticatedError,
  UnauthenticatedError,
} = require("../errors");

// Express Packages
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide an email and a password..");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("Please provide a valid email and a password..");
  }

  const isPasswordCorrect = await user.checkPassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Incorrect Password, please try again");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
