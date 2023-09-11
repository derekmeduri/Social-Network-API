const { Schema, model } = require("mongoose");
const moment = require("moment");

//creating user model schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
    timestamps: true,
  }
);
//create virtual property that gets amout of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
//user model created from the schema
const User = model("User", userSchema);
//export User
module.exports = User;
