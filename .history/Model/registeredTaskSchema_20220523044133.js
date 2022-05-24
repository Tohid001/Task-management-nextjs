const mongoose = require("mongoose");

// const moment = require("moment");

const registeredTaskSchema = mongoose.Schema(
  {
    actualTime: {
      type: Number,
      required: [true, "please enter actual time"],
    },
    action: {
      type: String,
      required: [true, "please enter actions"],
      trim: true,
    },
    user: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
    taskId: { type: mongoose.Schema.ObjectId, ref: "task", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("registry", registeredTaskSchema);
