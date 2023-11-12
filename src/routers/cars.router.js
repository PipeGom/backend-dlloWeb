const express = require("express")

const router = express.Router()
const { CarsController} = require("../controllers");
const _carscontroller = new CarsController


router.get("/", _carscontroller.getCars)
router.get("/:id", _carscontroller.getCar)
router.post("/", _carscontroller.createCar) //parametros de ruta
router.put("/:id",_carscontroller.updateCar)
router.delete("/id", _carscontroller.deleteCar)

module.exports = router