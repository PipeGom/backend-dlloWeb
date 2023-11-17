// el middleware es algo que se ejecuta en medio de una solicitud puede ocurrir antes o despues de la solicitud
// depende de donde este ubicado
// nos va permitir mostrar una estructura de response cuando no encuentre el endpoin 


const { verifyToken } = require('../services/JwtService');

// es una funcion que capture los headers de los headers captura la autorizacion y de la autorizacion captura el token
// se verifica si sale bien hace next si no token invalido debes volver autenticarte 

require('express');
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {*} next 
 */
const AuthMiddleware  =(req,res,next)=>{
    try {
        //hacemos un split de la autorization
        const {authorization} = req.headers;
        // es un string de un espacio porque es de la forma bearer token
        const token = authorization.split(' ')[1]
        console.log(token);
        // este es el token del usuario que esta pasando por los headers
        const user = verifyToken(token);

        // alternativa para guardar la informacuon del usuario a lo largo de la solicitud 
        req.user = user;
        next();
        
    } catch (error) {
    return res.status(500).json({
                ok:false,
                message:"Error Auth Middleware"
            });
    }
}
module.exports = AuthMiddleware;