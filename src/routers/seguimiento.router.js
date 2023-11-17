const express = require('express');
const router = express.Router();
const SeguimientoController = require('../controllers/seguimiento.controller');

const SeguimientoController = new SeguimientoController();

router.get("/", seguimientoController.getSeguimientos)
router.get("/:id", seguimientoController.getSeguimiento)
router.post('/', seguimientoController.createSeguimiento);
router.delete('/:id', seguimientoController.deleteSeguimiento);
router.put('/:id', seguimientoController.updateSeguimiento);

module.exports = router;
