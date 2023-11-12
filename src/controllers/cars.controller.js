require('express')

class CarsController {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    createCar(req, res){
        res.status(201).json({
            ok: true,
            message: "",
            info: ""
        })
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    updateCar(req, res){
        res.status(201).json({
            ok: true,
            message: "",
            info: ""
        })
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    getCar(req, res){
        res.status(201).json({
            ok: true,
            message: "",
            info: ""
        })
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    getCars(req, res){
        res.status(201).json({
            ok: true,
            message: "",
            info: ""
        })
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    deleteCar(req, res){
        res.status(204).json({
            ok: true,
            message: "",
            info: ""
        })
    }
}

module.exports = CarsController