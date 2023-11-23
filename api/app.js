const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");

const postsRouter = require("./routes/posts");
const authenticationRouter = require("./routes/authentication");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
const dataRouter = require("./routes/data");
const profilesRouter = require("./routes/profiles");


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
  console.log("from Token_generator - authHeader = " + authHeader)

  if (authHeader) {
    token = authHeader.slice(7);
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log("app.js error = " + err)
      console.log(err);
      res.status(401).json({ message: "auth error" });
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};


// route setup
// try {
//   app.use("/users", tokenChecker, usersRouter);
// } catch (err) {
//   console.log("Caught error********************************* " + err)
// } finally {
//   app.use("/users", usersRouter);
// }

//new route for posting avatar change
//app.use("/users/avatar", usersRouter);
app.use("/users", usersRouter);


app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", authenticationRouter);
// new route for comments
app.use("/comments", tokenChecker, commentsRouter);

//new route for obtaining user data based on user_id
app.use("/data", tokenChecker, dataRouter);
app.use("/profile", tokenChecker, profilesRouter);

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