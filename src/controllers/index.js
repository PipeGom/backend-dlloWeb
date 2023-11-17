// Importar el task router 
const TaskController = require('./tasks.controller')
const UserController = require('./users.controller')
const AuthController = require('./auth.controller')
const CarsController = require('./cars.controller')


// aqui vamos a guardar todos los controladores para que en el momento de importarlos
// desde el otro lado la url, esto evita que al momento de importar el archivo la url sea demasiado larga 
module.exports = {
    TaskController,
    UserController,
    AuthController,
    CarsController
}