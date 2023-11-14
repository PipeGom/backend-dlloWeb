const axios = require('axios');
const baseURL = "http://localhost:3000/seguimiento";

class SeguimientoController {
  async getAll(req, res) {
    try {
      const response = await axios.get(baseURL);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async create(req, res) {
    try {
      const { precio_reparacion, horas_reparacion, id_auto } = req.body;
      await axios.post(baseURL, { precio_reparacion, horas_reparacion, id_auto });
      res.status(201).json({ message: 'Seguimiento registrado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await axios.delete(`${baseURL}/${id}`);
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const { precio_reparacion, horas_reparacion } = req.body;
      await axios.put(`${baseURL}/${id}`, { precio_reparacion, horas_reparacion });
      res.status(200).json({ message: 'Seguimiento actualizado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = SeguimientoController;
