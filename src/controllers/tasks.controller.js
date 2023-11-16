require('express')
const {saveData,getData} = require('../controllers/filesystem.controller')
const Task = require('../models/Tasks');
const { MongoService } = require('../services/MongoService');

//ruta al json 
const PATH_DB = "./src/db/_tasks.json";

class TaskController {

    // el constructor va crear una instancia de MongoService que va tener la estructura del 
    // adaptador  
    constructor(){
        this.adapterDatabase = new MongoService()
    }

    // cada metodo va recibir un reques y un response, en typescript se deberia poner el tipo de dato 
    // se agrega un comentario de bloque y aparecen automaticamente y puedes ver sus metodos

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    createTask(req,res){

        try{


            const payload = req.body;
            
// Para crear la tarea instanciamos un objeto tarea , luego le pasamos sus parametros que vienen del cliente en el request por eso ponemos payload.id etc.

            const task = new Task(payload?.id,payload?.name, payload?.description)
            task.valid()
            

            // se guarda la tarea en un archivo local, y como segundo argumento 
            // se recibe el archivo json que contiene las caracteristicas de la tarea
            saveData(PATH_DB, task.toJson());



        // el req (request) va tener toda la inforamcion que se esta enviando desde el cliente al backend
        // el res contiene muchas formas para responder al cliente
        //Json para un apirest 
        //send se puede enviar tipos de datos como archivos, html o imagenes
        //status code 201 porque es de un metodo put
        
        res.status(201).json({
                // siempre manejar el mismo formato de respuesta para la api
                ok:true,
                message:"", //mensaje que pueda manipularse en el frontend
                info:payload,
        });
        }catch(error){
            // la funcion valid lanza un error en caso de que los campos enviados por el cliente no sean correctos 
            // y este error posee un mensaje dentro de la funcion valid porque se envia en forma de json
            res.status(error?.status || 500).json({
                // siempre manejar el mismo formato de respuesta para la api
                ok:false,
                message: error?.message || error, //mensaje que pueda manipularse en el frontend
                
        });
        }
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    updateTask(req,res){
        
        // para el update 200
        res.status(200).json({
                // siempre manejar el mismo formato de respuesta para la api
                ok:true,
                message:"", //mensaje que pueda manipularse en el frontend
                info:""
        })
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    // Para una tarea
    getTask(req,res){
        
        try {

            // en los metodos get,post,put que se utilicen :parametro
            // son los atributos que mostrara params
            const id = req.params.id
            const tasks = getData(PATH_DB)
            
            //Se busca la tarea si se encuentra se pasa en info y sino se muestra el error 
            // se busca en tasks y luego se guarda en task
            const task = tasks.find(x=>x.id === id)
            if (!task){
                throw {status:404, message:' La tarea no se encontro. '}
            }

            res.status(200).json({
                // siempre manejar el mismo formato de respuesta para la api
                ok:true,
                message:"Tarea consultada", //mensaje que pueda manipularse en el frontend
                info: task
        })
            
        } catch (error) {

            console.error(error);
            res.status(error?.status || 500).json({  
                ok:false,
                // operacion de encadenamiento opcional  si el primero existe 
                // sera devuelto si no sera devuelto el segundo 
                message: error?.message || error,
            })
            
        }
        
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    // Para varias tareas
    async getTasks(req,res){

        try{
        // Aqui esperamos la promesa de la conexion a la base de datos
        await this.adapterDatabase.executeQuery()
        
        const tasks = getData(PATH_DB)
        
       
        res.status(200).json({
                ok:true,
                message:"Tareas consultadas.",
                info:tasks
        });}
        catch(error){

            console.error(error);
            res.status(error?.status || 500).json({  
                ok:false,
                
                message: error?.message || error,
            })

        }
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    deleteTask(req,res){
        
        // para el delete 204, no responde ningun codigo
        res.status(204).json({
                // siempre manejar el mismo formato de respuesta para la api
                ok:true,
                message:"", //mensaje que pueda manipularse en el frontend
                info:""
        })
        // clase 3 de oct min 30:52
    }

}

module.exports= TaskController