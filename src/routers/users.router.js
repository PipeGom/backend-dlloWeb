const express = require("express")

const router = express.Router()


const { UserController} = require('../controllers')


const _usersController = new UserController()

router.get("/",_usersController.getUsers)


router.get("/:id",_usersController.getUser)
router.post("/",_usersController.createUser)
router.put("/:id",_usersController.updateUser)
router.delete("/:id",_usersController.deleteUser)

router.post("/:id/image_profile",_usersController.createImageProfile)



module.exports = router
