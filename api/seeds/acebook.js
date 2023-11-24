const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const USERS = require("./user-data");
const CONTENT = require("./post-and-comment-data");
const mongoDbUrl = process.env.MONGODB_URL || "mongodb://0.0.0.0/acebook";

//Color logging.
const reset = "\x1b[0m";
const log = {
  green: (text) => console.log("\x1b[32m" + text + reset),
  red: (text) => console.log("\x1b[31m" + text + reset),
  blue: (text) => console.log("\x1b[34m" + text + reset),
  yellow: (text) => console.log("\x1b[33m" + text + reset),
};

// Util function to generate random number.
const randomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

//Connect to db.
mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Removes all documents from db.
const resetDB = async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  await Comment.deleteMany({});
  log.green("Database reset complete!");
  log.green("\n");
};
//Inserts Users to db.
const insertUsers = async () => {
  await User.insertMany(USERS);
  log.green("Insert Users complete!");
  log.green("\n");
};
//Inserts Posts to db.
const insertPosts = async () => {
  await Post.insertMany(CONTENT);
  log.green("Insert Posts complete!");
  log.green("\n");
};

//Inserts Comments to db
const insertComments = async () => {
  await Comment.insertMany(CONTENT);
  log.green("Insert Comments complete!");
  log.green("\n");
};
//Returns list of users.
const findUsers = async () => {
  const users = await User.find({});
  return users;
};

//Returns list of posts.
const findPosts = async () => {
  const posts = await Post.find({});
  return posts;
};

//Adds random author to list of posts
const addAuthors = async () => {
  const users = await findUsers();

  CONTENT.forEach((post, i) => {
    const randomUser = randomIndex(USERS.length - 1);
    post.author = users[randomUser]._id;
    log.green(`${i} - Post Author added.`);
  });
};



//Adds author and post id to comments
const addAuthorPostIdtoComment = async () => {
  const users = await findUsers();
  const posts = await findPosts();

  CONTENT.forEach((comment, i) => {
    const randomUser = randomIndex(USERS.length - 1);
    const randomPost = randomIndex(CONTENT.length - 1);

    comment.author = users[randomUser]._id;
    log.green(`${i} - Comment author added.`);
    comment.post_id = posts[randomPost]._id;
    log.green(`${i} - Comment post_id added.`);
  });
};

//Main seed function
const seedDB = async () => {
  await resetDB();
  await insertUsers();
  await addAuthors();
  await insertPosts();
  await addAuthorPostIdtoComment();
  await insertComments();
  process.kill(0);
};
seedDB();
