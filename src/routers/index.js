const express = require("express")
const router = express.Router()

// importo el router
//Lo mas normal es que por crud se tenga un router
// convencion el prural


const taskRouter = require("./tasks.router")
const userRouter = require("./users.router")
// const reportRouter = reuire("./reportsRouter")
// Este index va tener todos los routers del sistema que seran exportados por los demas modulos en routers

// Establece la ruta para obtener las imagenes en la carpeta estatica
//Todo lo que hay en static internamente el static va redireccionar a la carpeta de docs y va encontrar la imagen
// static es una opcion para capturar directamente los archivos estaticos
router.use('/static/',express.static('docs'))
// El use se usa para decirle al router que rutas va usar, para los metodos http
router.use("/tasks",taskRouter)
router.use("/users",userRouter)
// Se exporta para usarse en el index principal

module.exports = router



