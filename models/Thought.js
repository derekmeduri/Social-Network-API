const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

//create reaction schema as a subdocument schema for thought schema model
const reactionSchema = new Schema(
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
      getters: true,
    },
    id: false,
    timestamps: true,
  }
);

//thought model
const thoughtSchema = new Schema(
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
        moment(createdAtVal).format("MMM D, YYYY [at] hh:mm a"),
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM D, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
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
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//create thought model with thought schema
const Thought = model("Thought", thoughtSchema);

//export thought model
module.exports = Thought;
