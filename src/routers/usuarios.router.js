const express = require("express")

const router = express.Router()

const { UserController } = require('../controllers')
const _userController = new UserController()


router.get("/",_userController.getUsers)
router.get("/:id",_userController.getUser)
router.post("/",_userController.createUser)
router.put("/:id",_userController.updateUser)
router.delete("/:id",_userController.deleteUser)

// Archivos para el usuario
router.post("/:id/documents", _userController.createDocumentUser)

module.exports = router