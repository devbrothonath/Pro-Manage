const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = Schema({
  value: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
});

const taskSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["high", "moderate", "low"],
    required: true,
  },
  tasklist: [listSchema],
  boardId: Number,
  dueDate: {
    type: Date,
  },
  user_id: {
    type: String,
    required: true
  }
}, {timestamps : true});

const Task = mongoose.model("Task", taskSchema)

module.exports = Task;
