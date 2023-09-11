const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

//create reaction schema as a subdocument schema for thought schema model
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM D, YYYY [at] HH:mm a"),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//thought model
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM D, YYYY [at] HH:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
//virtual property that gets amount of reactions per thought
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//create thought model with thought schema
const Thought = model("Thought", ThoughtSchema);

//export thought model
module.exports = Thought;
