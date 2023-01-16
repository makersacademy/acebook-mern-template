const mongoose = require('mongoose');
const Post = require('./post');
const User = require('./user');

const mongoDbUrl = process.env.MONGODB_URL || 'mongodb://0.0.0.0/acebook';
const mongoDbUrlTest = 'mongodb://0.0.0.0/acebook_test';

const connectToMongoDb = (dbUrl) => {
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Successfully connected to MongoDB (${dbUrl})`))
    .catch((error) => {
      throw new Error(`Something went wrong (${error.message})`);
    });
};

const seedDB = async (model, data) => {
  await model.deleteMany({});
  await model.insertMany(data);
};

const users = [
  {
    name: 'bill',
    email: 'bill@bill.com',
    password: 'bill',
    age: 22,
    avatar: '',
    bio: 'So many of my smiles are because of you',
    hometown: 'London',
    profession: 'Artist',
    relationship_status: 'Single',
    friends: ['63c53eee1d598b4bac90ae5e'],
  },

  {
    name: 'jeff',
    email: 'jeff@jeff.com',
    password: 'jeff',
    age: 25,
    avatar: '',
    bio: 'My life is better than my daydreams',
    hometown: 'Los Angeles',
    profession: 'Tycoon',
    relationship_status: 'Single',
    friends: ['63c53d1790253949a9bd3642'],
  },
];

const posts = [
  {
    user_id: '63c53d1790253949a9bd3642',
    message: 'I am first!',
    likes: ['63c53eee1d598b4bac90ae5e'],
    comments: [
      { user_id: '63c53eee1d598b4bac90ae5e', message: 'Nice post Bill' },
    ],
  },
  {
    user_id: '63c53eee1d598b4bac90ae5e',
    message: 'I am second!',
    likes: ['63c53d1790253949a9bd3642'],
    comments: [{ user_id: '63c53d1790253949a9bd3642', message: 'Hi Jeff' }],
  },
];

connectToMongoDb(mongoDbUrl);

seedDB(User, users)
  .then(() => seedDB(Post, posts))
  .then(() => {
    console.log('Database seeded!');
    console.log('Hold your head up as you travel the path ahead...');
    mongoose.connection.close();
  });
