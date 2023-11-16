require('express')
const { MongoService } = require("../services/MongoService");
const Car = require("../models/cars");

const PATH_DB = "./src/db/_tasks.json";
this.adapterDatabase = new MongoService();

class CarsController {

    constructor(){
        
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    createCar(req, res){
        try{
            const payload = req.body;
            const car = new Car(payload?.id, payload?.name, payload?.description)
            car.valid();
            saveData(PATH_DB, car.toStringJson());

            res.status(201).json({
                ok: true,
                message: "",
                info: payload,
            });    
        } catch (error) {
            console.error(error)
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message  || error, 
            });
        }
        
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    updateCar(req, res){
        try{
            res.status(201).json({
                ok: true,
                message: "",
                info: ""
            })
        }catch{

        }
        
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    getCar(req, res){
        try{
            const id = req.params.id
            const cars = getData(PATH_DB)
            const car = cars.find(x =>x.id === id)
            if (!car){
                throw {status:404, message: 'la auto no se encontro'}
            }
            res.status(200).json({
                ok: true,
                message: "Auto consultado",
                info: car,
            })

        } catch (error){
            console.error(error)
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message  || error, 
            });

        }
        
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    async getCars(req, res){
        try{
            
            const cars = await adapterDatabase.excuteQuery('cars');
            res.status(200).json({
                ok: true,
                message: "Autos consultados",
                info: cars,
        })
        } catch (error){
            
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message  || error, 
            });

        }
        
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