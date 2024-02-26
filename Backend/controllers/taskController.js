const Task = require("../models/taskModel.js");
const mongoose = require("mongoose");

// GET all tasks
const getTasks = async (req, res) => {
  const user_id = req.user._id;

  const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

// GET a single task
const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

// POST a new task
const createTask = async (req, res) => {
  const {title, priority, tasklist, boardId, dueDate} = req.body;

  let emptyFields = []

  if (!title) {
    emptyFields.push("title")
  }
  if (!priority) {
    emptyFields.push("priority")
  }
  // if (!taskData.taskList) {
  //   emptyFields.push("taskList")
  // }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: "Please fill in all the necessary fields", emptyFields})
  }
  // add document to db
  try {
    const user_id = req.user._id;
    const task = await Task.create({title, priority, tasklist, boardId, dueDate, user_id});
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST a card move to different board
const moveCard = async (req, res) => {
  try {
    const { cardId, targetBoardId } = req.body;

    // Update the task's boardId in the database
    await Task.findByIdAndUpdate(cardId, { boardId: targetBoardId });

    // Fetch the updated tasks from the database
    const updatedTasks = await Task.find({}).sort({ createdAt: -1 });

    res.status(200).json(updatedTasks);
  } catch (error) {
    console.error("Error moving card:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // const { cardId, targetBoardId } = req.body;
  // const tasks = await Task.find({}).sort({ createdAt: -1 });

  // const updatedTasks = tasks.map((task) => {
  //   if(task._id === cardId) {
  //     return { ...task, boardId: targetBoardId }
  //   }
  //   return task;
  // });

  // tasks.length = 0;
  // tasks.push(...updatedTasks);

  // res.status(200).json(tasks)
};

// DELETE a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(404).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

// UPDATE a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    {new: true}
  );

  if (!task) {
    return res.status(404).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  moveCard,
  deleteTask,
  updateTask,
};
