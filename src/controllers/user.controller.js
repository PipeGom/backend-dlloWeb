
require('express')

class UserController{

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    createUser(req,res){
        res.status(201).json({
            ok:true,
            message: "",
            info:""
        })
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    updateUser(req,res){
        res.status(200).json({
            ok:true,
            message: "",
            info:""
        })
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    getUser(req,res){
        res.status(200).json({
            ok:true,
            message: "",
            info:""
        })
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    getUsers(req,res){
        res.status(200).json({
            ok:true,
            message: "",
            info:""
        })
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    deleteUser(req,res){
        res.status(204).json({
            ok:true,
            message: "",
            info:""
        })
    }
}

module.exports = UserController