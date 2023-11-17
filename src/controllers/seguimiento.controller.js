require('express')
const { MongoService } = require("../services/MongoService");
const Seguimiento = require("../models/Seguimiento");
const { Collection } = require('mongodb');
const PATH_DB = "./src/db/_tasks.json";

const adapterDatabase = new MongoService();
const collection = 'seguimientos'

class SeguimientoController {

    constructor(){
        
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    async createSeguimiento(req, res){
        try{
            let payload = req.body;
            const seguimiento = new Seguimiento(payload?.id, payload?.id_auto, payload?.precio_reparacion, payload?.horas_reparacion)
            seguimiento.valid();
            //saveData(PATH_DB, car.toStringJson());
            const response = await adapterDatabase.create(collection, payload);

            payload._id = response.insertedId
            payload.url = `http:localhost:3000/${collection}/${payload.id}`

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
    async updateSeguimiento(req, res){
        try{
            let payload = req.body;
            const id = req.params.id;
            
            const seguimiento = new Seguimiento(payload?.id, payload?.id_auto, payload?.precio_reparacion, payload?.horas_reparacion)
            seguimiento.valid();
            const {modifiedCount:count} = await adapterDatabase.update(collection,payload,id);
            console.log(response)
            if(count == 0){
                
                throw {status: 409, message: "Error al actualizar"}
            }
            payload.url = `http:localhost:3000/${collection}/${payload.id}`
            res.status(201).json({
                ok: true,
                message: "",
                info: payload
            })
        }catch{

        }
        
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    async getSeguimiento(req, res){
        try{
            const id = req.params.id

            const seguimiento = await adapterDatabase.findOne(collection, id);

            
            if (!seguimiento){
                throw {status:404, message: 'la auto no se encontro'}
            }
            res.status(200).json({
                ok: true,
                message: "seguimiento consultado",
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
            
            const seguimientos = await adapterDatabase.findAll(collection);
            res.status(200).json({
                ok: true,
                message: "Seguimientos consultados",
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
    async deleteSeguimiento(req, res){
        try {

            // en los metodos get,post,put que se utilicen :parametro
            // son los atributos que mostrara params
            const id = req.params.id
            
            //Se busca la tarea si se encuentra se pasa en info y sino se muestra el error 
            // se busca en tasks y luego se guarda en task
            // cuando se hace un delete se retorna acknowledge y deletedCount
            const {deletedCount:count} = await adapterDatabase.delete(collection,id);
            // si no se borra nada deletedCount = 0 y renombramos la variable como count
            // deletedCount es la variable que destrctura: count el nombre de la variable que voy ausar 
            if (count = 0){
                throw {status:404, message:' El seguimiento no se encontro. '}
            }

                // para el delete 204, no responde ningun codigo
            res.status(204).json({
                // siempre manejar el mismo formato de respuesta para la api
                ok:true,
                message:"Auto eliminado", //mensaje que pueda manipularse en el frontend
                info:{}
        })
        // clase 3 de oct min 30:52
            
            
        } catch (error) {

            console.error(error);
            res.status(error?.status || 500).json({  
                ok:false,
                // operacion de encadenamiento opcional  si el primero existe 
                // sera devuelto si no sera devuelto el segundo 
                message: error?.message || error,
            })
            
        }
    }
}

module.exports = SeguimientoController