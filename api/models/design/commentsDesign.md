## Prescription Model and Schema Design 

### 1. Feature

>1. 'a user can view all comments on a post' 

### 2. Model Name and Properties

name: Comment
Properties: message, author, timestamp, post_id

### 3. Property types and validation

Here's a full documentation of Mongoose data types(https://mongoosejs.com/docs/schematypes.html) and validation options(https://mongoosejs.com/docs/validation.html)

Most of the time, you'll need either String, Number, Date, Boolean, Array, Buffer. If you're in doubt, do some research or ask your peers.

Properties: 
message: String
author: type: mongoose.Schema.Types.ObjectId, ref: 'User',
timestamp: [native]
post_id: type: mongoose.Schema.Types.ObjectId, ref: 'Post'

