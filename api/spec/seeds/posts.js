var mongoose = require('mongoose');
 
// make a connection 
mongoose.connect('mongodb://0.0.0.0/acebook_test');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
     
    // use Schema
   const Post = require('../../models/post.js')
 
    // empty collection
    // mongoose.connection.collections.posts.drop();
 
    // a document instance
    var post1 = new Post({ message: 'First Post', createdDateTime: new Date("2023-05-01T14:55:32") });
    var post2 = new Post({ message: 'Second Post', createdDateTime: new Date("2023-06-01T14:53:32") });
   var post3 = new Post({ message: 'Third Post', createdDateTime: new Date("2023-05-01T14:54:32") });

    const posts = [post1, post2, post3];

    // save model to database
    
    posts.forEach((post) => {
      post.save(function (err, post) {
        if (err) return console.error(err);
        console.log(post.message + " saved to posts collection.");
      });
    });
    
    mongoose.connection.close
     
});