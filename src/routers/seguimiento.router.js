const express = require('express');
const router = express.Router();
const SeguimientoController = require('../controllers/seguimiento.controller');

const seguimientoController = new SeguimientoController();

router.get('/', seguimientoController.getAll);
router.post('/', seguimientoController.create);
router.delete('/:id', seguimientoController.delete);
router.put('/:id', seguimientoController.update);

module.exports = router;
