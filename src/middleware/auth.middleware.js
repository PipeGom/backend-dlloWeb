const { verifyToken } = require("../services/JwtService");

require("express");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const AuthMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];
    console.log(token);
    const user = verifyToken(token);
    // Alternativa para guardar la información del usuario a lo largo de la solicitud
    req.user = user;
    next();
  } catch (error) {
    //TODO: Capturar el error especifico del token
    return res.status(400).json({
      ok: false,
      message: "Error Auth Middleware",
    });
  }
};

module.exports = { AuthMiddleware };
