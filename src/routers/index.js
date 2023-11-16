const express = require("express")
const router = express.Router()

// importo el router
//Lo mas normal es que por crud se tenga un router
// convencion el prural


const taskRouter = require("./tasks.router")
// const userRouter = require("./users.router")
// const reportRouter = reuire("./reportsRouter")
// Este index va tener todos los routers del sistema que seran exportados por los demas modulos en routers

// El use se usa para decirle al router que rutas va usar, para los metodos http
router.use("/tasks",taskRouter)

// Se exporta para usarse en el index principal

module.exports = router



