require('express')
const { TokenExpiredError } = require('jsonwebtoken');
const { createToken,verifyToken } = require('../services/JwtService');
const { MongoService } = require('../services/MongoService');
const { compareHash } = require('../services/Bcrypt');




const adapterDatabase = new MongoService();
const collection = 'users';

class AuthController {

    constructor(){}

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    // Para una tarea
    async login(req,res){
        
        try {

            // destructuramos email y password 
            const {email,password}= req.body;
            //TODO validar si me estan enviando email y password
            
            //Se busca el usuario por un filtro de email y password con el cifrado toca solobuscarlo por email
            const user = await adapterDatabase.findByFilter(collection,{email});

            // creamos una variable para comparar si la clave es igual o no
            const passwordEquals = compareHash(password,user.password);
            console.log(passwordEquals)
            // debemos borrar la contrasena para que no se envie en el token
            // si no existe o el password es 
            if (!user || passwordEquals == false){
                throw {status:404, message:' el usuario no se encontro. '}
            }

            // CREAR token
            // se le pasa toda la info del usuario
            delete user.password
            const token = createToken(user)

            res.status(200).json({
                // siempre manejar el mismo formato de respuesta para la api
                ok:true,
                message:"usuario consultado", //mensaje que pueda manipularse en el frontend
                info: {...user,token}, // ... user se llama sintaxis de propagacion y descompone el objeto como un array de elementos iterables
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

    async verifyToken(req,res){
        
        try {

            
            // tomamos el token del body  
            const { token }= req.body;
            // decodifica la info del usuario en el token
            const user = verifyToken(token);
            
            
            delete user.password
            if (!user){
                throw {status:404, message:' Error verififcando el token. '}
            }

            

            res.status(200).json({
                // siempre manejar el mismo formato de respuesta para la api
                ok:true,
                message:"Token verificado", //mensaje que pueda manipularse en el frontend
                info: {...user}, // ... user se llama sintaxis de propagacion y descompone el objeto como un array de elementos iterables
        });
            
        } catch (error) {

            if(error instanceof TokenExpiredError)
            {
                return  res.status(400).json({  
                        ok:false,
                        // operacion de encadenamiento opcional  si el primero existe 
                        // sera devuelto si no sera devuelto el segundo 
                        message: "Token no valido",
                            })
                
            }

            console.error(error);
            res.status(error?.status || 500).json({  
                ok:false,
                // operacion de encadenamiento opcional  si el primero existe 
                // sera devuelto si no sera devuelto el segundo 
                message: error?.message || error,
            })
            
        }

        
        
    }

}

module.exports= AuthController;