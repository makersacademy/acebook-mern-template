const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");
const notificationsRouter = require("./routes/notifications");
const likesRouter = require("./routes/likes");
const profilesRouter = require("./routes/profiles");

const app = express();

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {
  console.log(req.body);
  let token;
  const authHeader = req.get("Authorization");

  if (authHeader) {
    token = authHeader.slice(7);
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "auth error" });
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// route setup
app.use("/posts", tokenChecker, postsRouter);
app.use("/profiles", tokenChecker, profilesRouter);
app.use("/notifications", tokenChecker, notificationsRouter);
app.use("/comments", tokenChecker, commentsRouter);
app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);
app.use("/likes", likesRouter);
// app.use("/", postsRouter); // work this out!!

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({ message: "server error" });
});

module.exports = app;
