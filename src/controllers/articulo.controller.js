require('express')
const { MongoService } = require("../services/MongoService");
const Articulo = require("../models/Articulo");

const PATH_DB = "./src/db/_tasks.json";
this.adapterDatabase = new MongoService();

class ArticuloController {

    constructor(){
        
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Respose} res 
     */
    createArticulo(req, res){
        try{
            const payload = req.body;
            const articulo = new Articulo(payload?.id, payload?.name, payload?.description)
            articulo.valid();
            saveData(PATH_DB, articulo.toStringJson());

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
    updateArticulo(req, res){
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
    getArticulo(req, res){
        try{
            const id = req.params.id
            const inventario = getData(PATH_DB)
            const articulo = inventario.find(x =>x.id === id)
            if (!articulo){
                throw {status:404, message: 'el articulo no se encontró'}
            }
            res.status(200).json({
                ok: true,
                message: "Articulo encontrado",
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
    async getArticulos(req, res){
        try{
            
            const inventario = await adapterDatabase.excuteQuery('inventario');
            res.status(200).json({
                ok: true,
                message: "Articulos consultados",
                info: inventario,
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
    deleteArticulo(req, res){
        res.status(204).json({
            ok: true,
            message: "",
            info: ""
        })
    }
}

module.exports = ArticuloController