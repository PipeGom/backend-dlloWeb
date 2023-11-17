const express = require("express")

const router = express.Router()


const { UserController} = require('../controllers')


const _usersController = new UserController()






router.post("/",_usersController.createUser)





module.exports = router