const express = require("express")

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
router.post("/", (req, res) => {
    res.json({mssg: "POST a new task"})
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