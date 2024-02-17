const express = require("express")
const Task = require("../models/taskModel.js")

const router = express.Router();

// GET all tasks
router.get("/", (req, res) => {
    res.json({mssg: "GET all tasks"})
})
// GET a single task
router.get("/:id", (req, res) => {
    res.json({mssg: "GET a single task by id"})
})
// POST a new task
router.post("/", async (req, res) => {
    const taskData = req.body;
    try {
        const task = await Task.create(taskData)
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
    // res.json({mssg: "POST a new task"})
})
// DELETE a single task
router.delete("/:id", (req, res) => {
    res.json({mssg: "DELETE a single task by id"})
})
// UPDATE a single task
router.patch("/:id", (req, res) => {
    res.json({mssg: "UPDATE a single task by id"})
})

module.exports = router