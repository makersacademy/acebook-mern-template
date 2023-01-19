const User = require("../models/user");

const UsersController = {
  Create: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = await User.signup(name, email, password);

      res.status(201).json({ message: "OK" });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  },
  Index: async (req, res) => {
    // Find all of the users from the user model
    const users = await User.find({});
    // Send a 200 response containing all users to the client
    res.status(200).json(users);
  },
  GetUserInfo: async (req, res) => {
    // Find all of the users from the user model
    const userId = req.params.id;

    const user = await User.findOne({ _id: userId });
    // Send a 200 response containing all users to the client
    res.status(200).json({ user });
  },
  UpdateUserInfo: async (req, res) => {
    try {
      // Find the user by their ID
      const user = await User.findById(req.params.id);

      // Update the user's name with the new name provided in the request body
      user.name = req.body.name;

      // Save the updated user to the database
      await user.save();

      // Send a success response with the updated user information
      res.status(200).json({
        message: "User's name updated successfully",
        data: user,
      });
    } catch (error) {
      // Send a failure response with the error message
      res.status(400).json({ message: error.message });
    }
  },
  SendFriendRequest: async (req, res) => {
    // gets user_id of sender and user_id of receiver
    // will put the user_id of the sender in the friendRequestRecieved of the reciever
    // will also the user_id of the sender in the friendRequetsSent of the sender
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    receiver.friendRequestsReceived.push(senderId);
    sender.friendRequestsSent.push(receiverId);

    await sender.save();
    await receiver.save();

    res.status(200).send({ message: "OK! Friend Request sent" });
  },
  AcceptFriendRequest: async (req, res) => {
    // this removes the user_id of the sender from your friendsRequestRecieved array
    // and also removed the user_id of you from the senders friendsReqeusstsSent array
    // and adds the user_id to the friends array
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    sender.friendRequestsSent.pull(receiverId);
    receiver.friendRequestsReceived.pull(senderId);
    receiver.friends.push(senderId);
    sender.friends.push(receiverId);

    await sender.save();
    await receiver.save();

    res.status(200).send({ message: "OK! Friend Request accepted" });
  },
  RejectOrCancelFriendRequest: async (req, res) => {
    // this removes the user_id of the sender from your friendsRequestRecieved array
    // also removes your user_id from the senders friendsRequestsSent array
    // and doesnt add the user_id to the friends array of the receiver
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    sender.friendRequestsSent.pull(receiverId);
    receiver.friendRequestsReceived.pull(senderId);

    await sender.save();
    await receiver.save();

    res
      .status(200)
      .json({ message: "OK! Friend Request cancelled or rejected" });
  },
  RemoveFriend: async (req, res) => {
    const userId = req.body.userId;
    const friendId = req.body.friendId;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    user.friends.pull(friendId);
    friend.friends.pull(userId);

    await user.save();
    await friend.save();

    res.status(200).send({ message: "OK! Friend removed successfully" });
  },
  FriendsData: async (req, res) => {
    // does a .populate on friends, friendsRequestsRecieved and friendsRequestsSent
    // so can access the names, ids, profile pics etc of all
    // so on friends page use something like the useEffect on feed to get all the
    // friend data of the logged in user
    // data.friendRequestsSent.map for the sent friend requests
    // data.friendRequestsRecieved.map for the friend requests bit
    // like data.friends.map for the friends bit
  },
};

module.exports = UsersController;
