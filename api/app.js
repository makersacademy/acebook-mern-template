// a package that creates standard http error messages for you
const createError = require("http-errors");
// import the express app
const express = require("express");
// get access to node path info
// helps you set the directory for your public file
const path = require("path");
// morgan helps create debugging msgs
const logger = require("morgan");
const JWT = require("jsonwebtoken");

const postsRouter = require("./routes/posts");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");

// need to create an instance of the app to access Express
const app = express();

// app.use() is a way to communicate
// what you want Express to `use`
app.use(logger("dev"));
// setup for receiving JSON
app.use(express.json()); // this line was written twice (I removed one)
// set the static folder to access public folder (there isn't one in /api currently)
// this is where you store css, images etc
// https://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, "public")));

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {

  let token;
  const authHeader = req.get("Authorization")

  if(authHeader) {
    token = authHeader.slice(7)
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if(err) {
      console.log(err)
      res.status(401).json({message: "auth error"});
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};

// Route setup
// when the app looks at the current url it runs down
// this list in sequentially and follows any matching route

// /post --> (GET /posts/ and POST /posts/)
app.use("/posts", tokenChecker, postsRouter);
// /tokens --> (POST /tokens/)
app.use("/tokens", tokensRouter);
// /users --> (POST /users/)
app.use("/users", usersRouter);


// if no route is found
// (e.g. current url => /incorrect)
// this last app.use() is a route catch all

// catch 404 (route doesn't exist) and forward to error handler
app.use((req, res, next) => {
  // createError is package we installed to help
  // create error objects for us
  // next() is used in 'middleware' to tell the program
  // to move onto the next section
  next(createError(404));
});

// error handler
// either we receive an error 404 object from the app.use() above
// or there's a server error at this point
app.use((err, req, res) => {
  // set locals
  // required to make sure message passed between requests <-- ** needs better explanation
  res.locals.message = err.message;
  // only provide an error message in development for debugging
  // note this returns an empty object if not in dev mode
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  // 500 server error if we have not attached a status to the response
  // only returns json object
  res.status(err.status || 500).json({message: 'server error'})
});

module.exports = app;
