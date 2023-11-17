const express = require("express")

const router = express.Router()
const { ArticuloController} = require("../controllers");
const _articulocontroller = new ArticuloController

router.get("/", _articulocontroller.getArticulos)
router.get("/:id", _articulocontroller.getArticulo)
router.post("/", _articulocontroller.createArticulo) //parametros de ruta
router.put("/:id",_articulocontroller.updateArticulo)
router.delete("/:id", _articulocontroller.deleteArticulo)

module.exports = router