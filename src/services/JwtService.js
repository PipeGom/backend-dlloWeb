const jwt = require('jsonwebtoken');


const SECRET = '95144a4c3fcbcd586df8c1d31860d6008661d89f'
const createToken = (payload) =>{

    // asi jwt cifra el payload se le debe pasar un secret key con el que se va cifrar el payload
    // Se le puede pasar un tiempo de validez al token
    return jwt.sign(payload,SECRET,{expiresIn:"2h"});
}

// decodifica y verifica si el token es correcto
const verifyToken = (token) =>{
    return jwt.verify(token,SECRET);
}

module.exports = {createToken, verifyToken}