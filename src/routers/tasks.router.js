const express = require("express")

// para exportar este archivo hay varios metodos se usa un json

// esta instancia es para crear unas rutas
const router = express.Router()


//importar los controladores, y se van a desestructurar

const { TaskController } = require('../controllers')

// Como se quiere usar la clase controladores se debe crear una instancia
// Como es una variable interna se usa _taskController
const _taskController = new TaskController()

// por buenas practicas esta ruta debe ir en plural, estan ubicadas en el archivo index en el metodo router.use
// Es buena practica tener diferentes endpoints para todas las tareas o una especifica segun el estandar swagger
//por esta razon se hacen dos get 

// se usan parametros de ruta o querystring para las consultas a una tarea especifica
// cuando pida el parametro dinamico se debe proporcionar 
// Al metodo .get se le pasa el controlador
// Con f2 se modifican todas las conincidencias y con ctrl + shift + l 
// Al metodo no se le deben poner los parentesis

router.get("/",_taskController.getTasks)

// Ruta para tarea especifica
router.get("/:id",_taskController.getTask)
router.post("/",_taskController.createTask)
router.put("/:id",_taskController.updateTask)
router.delete("/:id",_taskController.deleteTask)

//se exporta la instancia

module.exports = router


// Para saber donde va recibir el request o donde va dar el response, ahi es donde se usa el controlador.