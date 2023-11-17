const express = require("express")

const router = express.Router()
const { SeguimientoController} = require("../controllers");
const _seguimientocontroller = new SeguimientoController()


router.get("/", _seguimientocontroller.getSeguimientos)
router.get("/:id", _seguimientocontroller.getSeguimiento)
router.post("/", _seguimientocontroller.createSeguimiento) //parametros de ruta
router.put("/:id",_seguimientocontroller.updateSeguimiento)
router.delete("/id", _seguimientocontroller.deleteSeguimiento)

module.exports = router