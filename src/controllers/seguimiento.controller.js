require('express')
const { MongoService } = require("../services/MongoService");
const Car = require("../models/Seguimiento");

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
    createSeguimiento(req, res){
        try{
            const payload = req.body;
            const car = new Car(payload?.id, payload?.id_auto, payload?.precio_reparacion, payload?.horas_reparacion)
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
    updateSeguimiento(req, res){
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
    getSeguimiento(req, res){
        try{
            const id = req.params.id
            const seguimientos = getData(PATH_DB)
            const seguimiento = seguimientos.find(x =>x.id === id)
            if (!seguimiento){
                throw {status:404, message: 'No se encuentra el seguimiento'}
            }
            res.status(200).json({
                ok: true,
                message: "Seguimiento consultado",
                info: seguimiento,
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
    async getSeguimientos(req, res){
        try{
            
            const seguimientos = await adapterDatabase.excuteQuery('seguimientos');
            res.status(200).json({
                ok: true,
                message: "Se obtuvieron los seguimientos",
                info: seguimientos,
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
    deleteSeguimiento(req, res){
        res.status(204).json({
            ok: true,
            message: "",
            info: ""
        })
    }
}

module.exports = SeguimientoController