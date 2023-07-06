const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const imgSchema = require("./models/image");
const fs = require("fs");

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");
const notificationsRouter = require("./routes/notifications");

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

// route setup
app.use("/posts", tokenChecker, postsRouter);
app.use("/notifications", tokenChecker, notificationsRouter);
app.use("/comments", tokenChecker, commentsRouter);
app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);
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

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// const upload = multer({ storage: storage });

// app.get("/", (req, res) => {
//   imgSchema.find({}).then((data, err) => {
//     if (err) {
//       console.log(err);
//     }
//     res.render("imagepage", { items: data });
//   });
// });

// app.post("/", upload.single("image"), (req, res, next) => {
//   const obj = {
//     name: req.body.name,
//     desc: req.body.desc,
//     img: {
//       data: fs.readFileSync(
//         path.join(__dirname + "/uploads/" + req.file.filename)
//       ),
//       contentType: "image/png",
//     },
//   };
//   imgSchema
//     .create(obj)
//     .then((item) => {
//       res.redirect("/");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "server error" });
//     });
// });

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     app.listen(process.env.PORT || 3000, () => {
//       console.log("Server started on port " + (process.env.PORT || 3000));
//     });
//   })
//   .catch((err) => {
//     console.log("DB connection error:", err);
//   });

module.exports = app;
