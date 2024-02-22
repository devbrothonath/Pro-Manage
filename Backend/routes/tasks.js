const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  moveCard,
  deleteTask,
  updateTask
} = require("../controllers/taskController.js");

const router = express.Router();

// GET all tasks
router.get("/", getTasks);

// GET a single task
router.get("/:id", getTask);

// POST a new task
router.post("/", createTask);

// POST a card movement to different board
router.post("/moveCard", moveCard)

// DELETE a single task
router.delete("/:id", deleteTask);

// UPDATE a single task
router.patch("/:id", updateTask);

module.exports = router;
