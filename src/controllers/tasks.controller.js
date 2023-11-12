require("express");
const Task = require("../models/Tasks");
const { MongoService } = require("../services/MongoService");

const colletion = "tasks";
const adapterDatabase = new MongoService();

class TasksController {
  constructor() {}

  /**
   * PENDIENTE:
   * - Realizar la validación de tarea y body
   * - Validar si el documento existe antes de insertar
   * -
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async createTask(req, res) {
    try {
      let payload = req.body;
      const task = new Task(payload?.id, payload?.name, payload?.description);
      task.valid();
      // saveData(PATH_DB, task.toJson());
      const response = await adapterDatabase.create(colletion, payload);
      payload.id = response.insertedId;
      payload.url = `http://localhost:3000/${colletion}/${payload.id}`;
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
  async updateTask(req, res) {
    try {
      let payload = req.body;
      const id = req.params.id;
      const task = new Task(payload?.id, payload?.name, payload?.description);
      task.valid();
      // saveData(PATH_DB, task.toJson());
      const { modifiedCount: count } = await adapterDatabase.update(colletion, payload, id);
      if (count == 0) {
        throw { status: 409, message: "Error al actualizar." };
      }
      payload.url = `http://localhost:3000/${colletion}/${payload.id}`;
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
  async getTask(req, res) {
    try {
      const id = req.params.id;
      const task = await adapterDatabase.findOne(colletion, id);
      if (!task) {
        throw { status: 404, message: "La tarea no se encontro." };
      }
      res.status(200).json({
        ok: true,
        message: "Tarea consultada",
        info: task,
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
  async getTasks(req, res) {
    try {
      const tasks = await adapterDatabase.findAll(colletion);
      res.status(200).json({
        ok: true,
        message: "Tareas consultadas",
        info: tasks,
      });
    } catch (error) {
      console.log(error);
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
  async deleteTask(req, res) {
    try {
      const id = req.params.id;
      // deletedCount es la variable que destructuro: count el nombre de la variable que voy a usar
      const { deletedCount: count } = await adapterDatabase.delete(colletion, id);
      if (count == 0) {
        throw { status: 404, message: "La tarea no se encontro." };
      }
      res.status(200).json({
        ok: true,
        message: "Tarea eliminada",
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
  async createDocumentTask(req, res) {
    try {
      // id de la tarea
      const id = req.params.id;
     
      const document = req.files.document
      if (document) {
        
        document.mv(`./docs/${document.md5}${document.name}`)
        res.status(200).json({
          ok: true,
          message: "Documento de la tarea guardado",
          info: 'PENDIENTE RETORNAR Y GUARDAR URL',
        });
      }

    
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }
}

module.exports = TasksController;
