const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const USERS = require("./user-data");
const CONTENT = require("./post-and-comment-data");
const mongoDbUrl = process.env.MONGODB_URL || "mongodb://0.0.0.0/acebook";

mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Removes all documents from db.
const resetDB = async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  await Comment.deleteMany({});
};
//Inserts Users to db.
const insertUsers = async () => {
  await User.insertMany(USERS);
};
//Inserts Posts to db.
const insertPosts = async () => {
  await Post.insertMany(CONTENT);
};

//Inserts Comments to db
const insertComments = async () => {
  await Comment.insertMany(CONTENT);
};
//Returns list of users.
const findUsers = async () => {
  const users = await User.find({});
  console.log(users);
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

  CONTENT.forEach((post) => {
    const randomUser = Math.floor(Math.random() * (USERS.length - 1));
    post.author = users[randomUser]._id;
  });
};

//Adds author and post id to comments
const addAuthorPostIdtoComment = async () => {
  const users = await findUsers();
  const posts = await findPosts();

  CONTENT.forEach((comment) => {
    const randomUser = Math.floor(Math.random() * (USERS.length - 1));
    const randomPost = Math.floor(Math.random() * (CONTENT.length - 1));

    comment.author = users[randomUser]._id;
    comment.post_id = posts[randomPost]._id;
    console.log(CONTENT);
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
};
seedDB();
