require("express");
const { TokenExpiredError } = require("jsonwebtoken");
const { createToken, verifyToken } = require("../services/JwtService");
const { MongoService } = require("../services/MongoService");
const { compareHash } = require("../services/Bcrypt");

const colletion = "users";
const adapterDatabase = new MongoService();

class AuthController {
  constructor() {}

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // VALIDAR email & password
      const user = await adapterDatabase.findByFilter(colletion, { email });
      const passwordEquals = compareHash(password, user.password);
      console.log(passwordEquals);
      if (!user || passwordEquals == false) {
        throw { status: 404, message: "La usuario no se encontro." };
      }
      // // CREAR TOKEN
      delete user.password;
      const token = createToken(user);
      res.status(200).json({
        ok: true,
        message: "Usuario consultado",
        info: { ...user, token },
      });
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }

  async verifyToken(req, res) {
    try {
      const { token } = req.body;
      const user = verifyToken(token);
      if (!user) {
        throw { status: 400, message: "Error verificando el token." };
      }
      // CREAR TOKEN
      res.status(200).json({
        ok: true,
        message: "Token verificado",
        info: { ...user },
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(400).json({
          ok: false,
          message: "Token no valido",
        });
      }
      return res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }
}

module.exports = AuthController;
