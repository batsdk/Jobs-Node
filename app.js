require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// Middleware
const authMiddleware = require("./middleware/authentication");

// ConnectDB
const connectDB = require("./db/connect");

// Router
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

// routes
app.use("/auth", authRouter);
app.use("/jobs", authMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Video 29 ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
