const { User, Thought } = require("../models");

//user create read update delete
const userCRUDs = {
  //get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().select("-__v");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get single user by _id
  async getUser(req, res) {
    try {
      //find user by id:
      const user = await User.findById(req.params.userId)
        .select("-__v")
        .populate("friends")
        .populate("thoughts");

      if (!user) {
        return res.status(404).json({ message: "No user found!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update user
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user found!" });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete user and thoughts if user is deleted
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "No user found!" });
      }
      //delete user thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      //update friends list once user is deleted
      await User.updateMany(
        { friends: { $in: [user._id] } },
        { $pull: { friends: user._id } }
      );
      res.json({ message: "User and Thoughts successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //add friend
  //api/users/:userId/friends/:friendId
  async addFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user found!" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //remove friend
  async removeFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user found!" });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userCRUDs;
