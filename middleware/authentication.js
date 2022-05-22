const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthenticatedError("Failed to get auth header : " + authHeader);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("payload : " + payload);
    req.user = { userID: payload.userID };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Failed..");
  }
};

module.exports = auth;
