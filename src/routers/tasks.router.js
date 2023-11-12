const express = require("express")

const router = express.Router()

const { TasksController } = require('../controllers');
const _taskController = new TasksController()

router.get("/", _taskController.getTasks)
router.get("/:id", _taskController.getTask)
router.post("/", _taskController.createTask)
router.put("/:id", _taskController.updateTask)
router.delete("/:id", _taskController.deleteTask)

// Archivos para la tarea
router.post("/:id/documents", _taskController.createDocumentTask)

module.exports = router