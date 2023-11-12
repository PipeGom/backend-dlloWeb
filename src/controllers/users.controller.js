require("express");
const User = require("../models/Users");
const { generateHash } = require("../services/Bcrypt");
const ConfigService = require("../services/ConfigService");
const { MongoService } = require("../services/MongoService");

const colletion = "users";
const adapterDatabase = new MongoService();
const config = new ConfigService();

class UsersController {
  constructor() { }

  /**
   * PENDIENTE:
   * - Realizar la validación de tarea y body
   * - Validar si el documento existe antes de insertar
   * -
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async createUser(req, res) {
    try {
      let payload = req.body;
      const user = new User(payload);
      user.valid();

      payload.password = await generateHash(payload.password);
      console.log("password", payload.password);
      const userDb = await adapterDatabase.findByFilter(colletion, { id: user.id });
      if (userDb) {
        throw { status: 400, message: "El usuario ya existe" };
      }
      const response = await adapterDatabase.create(colletion, payload);
      payload._id = response.insertedId;
      res.status(201).json({
        ok: true,
        message: "",
        info: payload,
      });
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }

  /**
   *
   * PENDIENTE:
   * - Realizar la validación de tarea y body
   * - Validar si el documento existe antes de actualizar
   * -
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async updateUser(req, res) {
    try {
      let payload = req.body;
      const id = req.params.id;
      const user = new User(payload);
      user.valid();
      const { modifiedCount: count } = await adapterDatabase.update(colletion, payload, id);
      if (count == 0) {
        throw { status: 409, message: "Error al actualizar." };
      }
      res.status(200).json({
        ok: true,
        message: "",
        info: payload,
      });
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getUser(req, res) {
    try {
      const id = req.params.id;
      const user = await adapterDatabase.findOne(colletion, id);
      if (!user) {
        throw { status: 404, message: "La usuario no se encontro." };
      }
      res.status(200).json({
        ok: true,
        message: "Usuario consultado",
        info: user,
      });
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getUsers(req, res) {
    try {
      console.log('All users');
      const users = await adapterDatabase.findAll(colletion);
      console.log(users);

      res.status(200).json({
        ok: true,
        message: "Usuarios consultados",
        info: users,
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const { deletedCount: count } = await adapterDatabase.delete(colletion, id);
      if (count == 0) {
        throw { status: 404, message: "La usuario no se encontro." };
      }
      res.status(200).json({
        ok: true,
        message: "Usuario eliminado",
        info: {},
      });
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async createImageProfile(req, res) {
    try {
      const id = req.params.id;
      const document = req.files.document;
      if (document) {
        document.mv(`./docs/${document.md5}${document.name}`);
        const host = config.get("api_host");
        const url = `${host}static/${document.md5}${document.name}`;
        const user = await adapterDatabase.findOne(colletion, id);
        user.image_profile = url;
        await adapterDatabase.update(colletion, user, id);

        res.status(200).json({
          ok: true,
          message: "Imagen del usuario guardado",
          info: user,
        });
      }
      throw { status: 400 }
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }
}

module.exports = UsersController;
