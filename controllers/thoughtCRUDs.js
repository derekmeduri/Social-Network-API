const { Thought, User } = require("../models");

const thoughtCRUDSs = {
  //api/thoughts
  //get all thoughts
  async getThoughts(req, res) {
    try {
      //get all thoughts and sort by newest
      const allThoughts = await Thought.find().sort({ createdAt: -1 });
      res.json(allThoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get thought by id
  async getThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId).select(
        "-__v"
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //create new thought (push thoughts id to users thought array)
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { thoughts: newThought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json({ message: "Thought successfully created!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update thought by _id
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "No thought found!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete thought by _id
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(
        req.params.thoughtId
      );
      if (!deletedThought) {
        return res.status(404).json({ message: "No thought found!" });
      }
      const user = await User.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }
      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //add reaction to thought by _id
  async addReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "No thought found" });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //remove reaction by _id
  async removeReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "No thought found" });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtCRUDSs;
