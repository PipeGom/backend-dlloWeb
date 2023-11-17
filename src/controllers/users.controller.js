require('express')
const User = require('../models/Users');
const { generateHash } = require('../services/Bcrypt');
const ConfigService = require('../services/ConfigService');
const { MongoService } = require('../services/MongoService');



const adapterDatabase = new MongoService();
const collection = 'users'
const config = new ConfigService();

class UserController {

    // el constructor va crear una instancia de MongoService que va tener la estructura del 
    // adaptador  
    constructor(){
        
    }

    // cada metodo va recibir un reques y un response, en typescript se deberia poner el tipo de dato 
    // se agrega un comentario de bloque y aparecen automaticamente y puedes ver sus metodos

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async createUser(req,res){

        try{
            

            let payload = req.body;
            // Enviamos el payload directamente al modelo
            const user = new User(payload);
            //TODO finalizar la validacion de campos
            // TODO validar que un usuario exista antes de crearlo 
            user.valid()

            // si es valido guardamos la contrasena cifrada
            payload.password = await generateHash(payload.password)
            console.log('Password',payload.password);

            // debemos verificar que no exista en la base de datos 
            const userDb = await adapterDatabase.findByFilter(collection,{id:user.id});
            console.log(userDb)
            
            // si existe debemos mandar un error para que no lo vuelva a registrar
            if(userDb)
            {
                throw {status:400, message: 'El usuario ya existe'}
            }
                // aqui se guarda el usuario
            const response = await adapterDatabase.create(collection,payload);

            payload._id = response.insertedId
            //_id de mongo y id para la identificacion del usuario

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
    async updateUser(req,res){
        try{


            let payload = req.body;
            const id = req.params.id;
            // el constructor de user recibe un objeto que va destructurar
            const user = new User(payload);
            user.valid()
            const {modifiedCount:count} = await adapterDatabase.update(collection,payload,id);
            console.log(response)
            if(count == 0){
                
                throw {status: 409, message: "Error al actualizar"}
            }
        res.status(200).json({
            ok:true,
            message:"Se actualizo correctamente",
            info:payload
    })
        }catch(error){
                res.status(error?.status || 500).json({
                ok:false,
                message: error?.message || error, 
                
        });
        }
        
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    // Para una tarea
    async getUser(req,res){
        
        try {

            // en los metodos get,post,put que se utilicen :parametro
            // son los atributos que mostrara params
            const id = req.params.id
            
            //Se busca la tarea si se encuentra se pasa en info y sino se muestra el error 
            // se busca en Users y luego se guarda en User
            const user = await adapterDatabase.findOne(collection,id);
            if (!user){
                throw {status:404, message:' el usuario no se encontro. '}
            }

            res.status(200).json({
                // siempre manejar el mismo formato de respuesta para la api
                ok:true,
                message:"usuario consultado", //mensaje que pueda manipularse en el frontend
                info: user
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
    async getUsers(req,res){

        try{
        // Aqui esperamos la promesa de la conexion a la base de datos
        // le pasamos el nombre de la collection de mongo 
       
        const users =  await adapterDatabase.findAll(collection) 
       
        res.status(200).json({
                ok:true,
                message:"Usuarios consultados.",
                info:users
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
    async deleteUser(req,res){
        
        try {

            // en los metodos get,post,put que se utilicen :parametro
            // son los atributos que mostrara params
            const id = req.params.id
            
            //Se busca la tarea si se encuentra se pasa en info y sino se muestra el error 
            // se busca en Users y luego se guarda en User
            // cuando se hace un delete se retorna acknowledge y deletedCount
            const {deletedCount:count} = await adapterDatabase.delete(collection,id);
            // si no se borra nada deletedCount = 0 y renombramos la variable como count
            // deletedCount es la variable que destrctura: count el nombre de la variable que voy ausar 
            if (count == 0){
                throw {status:404, message:' el usuario no se encontro. '}
            }

                // para el delete 204, no responde ningun codigo
            res.status(204).json({
                // siempre manejar el mismo formato de respuesta para la api
                ok:true,
                message:"Usuario eliminado", //mensaje que pueda manipularse en el frontend
                info:{}
        })
        // clase 3 de oct min 30:52
            
            
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
     * @param {import('express).Request} req
     * @param {import('express).Response} res 
     */
    async createImageProfile(req,res){
        try {

            //id de la tarea 
   
            const id = req.params.id
            
            // TODO pendiente guardar el url de la imagen en mongo
            const document = req.files?.document
            //console.log(document)
            if(document){
                // si existe el documento muevalo a la carpeta de docs
                document.mv(`./docs/${document.md5}${document.name}`)
                const host = config.get('api_host')
                const url = `${host}static/${document.md5}${document.name}`
                const user = await adapterDatabase.findOne(collection,id);
                user.image_profile = url
                // lo que se guarda es el url a la imagen
                // aqui se actualiza el usuario con la imagen el usuario

                const response = await adapterDatabase.update(collection,user,id);


                res.status(200).json({
          
                    ok:true,
                    message:"Imagen del usuario guardado", 
                    info:user,
            })
            }

            
            
            
        } catch (error) {

            console.error(error);
            res.status(error?.status || 500).json({  
                ok:false,
               
                message: error?.message || error,
            })
            
        }
        
    }

}

module.exports= UserController