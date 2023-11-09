const express = require("express")

const router = express.Router()

const userRouter = require("./usuarios.router")

router.use("/users", userRouter)

module.exports = router

