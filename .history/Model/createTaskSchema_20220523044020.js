const mongoose = require("mongoose");

const createTaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter task title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter task description"],
    trim: true,
  },
  estimatedTime: {
    type: Number,
    required: [true, "please enter estimated time"],
  },
  priority: {
    type: String,
    required: [true, "please select priority"],
    trim: true,
  },
  user: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
});

module.exports = mongoose.model("task", createTaskSchema);
