const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const postsRouter = require("./routes/posts");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

const app = express();

// setup for receiving JSON
app.use(express.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {
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

// bcrypt middleware function

const bcryptPasswordHasher = (req, res, next) => {
  // console.log(req)
  const saltRounds = 10;
  const password = req.body.password;
  bcrypt.genSalt(saltRounds, function (saltError, salt) {
    // console.log(saltError)
    if (saltError) {
      res.status(401).json({ message: "saltError" });
    } else {
      bcrypt.hash(password, salt, function (hashError, hash) {
        if (hashError) {
          res.status(401).json({ message: "hashError" });
          // console.log(hashError)
          throw hashError;
        } else {
          req.body.password = hash;
          // 'next()' moves the program onto the Router once the middleware is complete
          next();
          // console.log(hash)
        }
      });
    }
  });
};
// route setup - route, follows to middleware (if exists) and then accesses server side Router
app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", tokensRouter);
app.use("/users", bcryptPasswordHasher, usersRouter);
app.use("/user", usersRouter);
app.use("/comments", tokenChecker, commentsRouter);

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
