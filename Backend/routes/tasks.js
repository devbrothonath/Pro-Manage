const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  moveCard,
  deleteTask,
  updateTask
} = require("../controllers/taskController.js");
const requireAuth = require("../middleware/requireAuth.js")

const router = express.Router();

// GET all tasks
router.get("/", requireAuth, getTasks);

// GET a single task
router.get("/:id", getTask);

// POST a new task
router.post("/",requireAuth, createTask);

// POST a card movement to different board
router.post("/moveCard", requireAuth, moveCard)

// DELETE a single task
router.delete("/:id", requireAuth, deleteTask);

// UPDATE a single task
router.patch("/:id", requireAuth, updateTask);

module.exports = router;
