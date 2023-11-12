const express = require("express")

const router = express.Router()

const { UsersController } = require('../controllers');
const _usersController = new UsersController()

router.get("/", _usersController.getUsers)
router.get("/:id", _usersController.getUser)
router.post("/", _usersController.createUser)
router.put("/:id", _usersController.updateUser)
router.delete("/:id", _usersController.deleteUser)

// Archivos para la tarea
router.post("/:id/image_profile", _usersController.createImageProfile)

module.exports = router