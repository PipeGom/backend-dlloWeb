const express = require("express")
const router = express.Router()

// importo el router
//Lo mas normal es que por crud se tenga un router
// convencion el prural

const carsRouter = require("./cars.router")
const taskRouter = require("./tasks.router")
const userRouter = require("./users.router")
const seguimientoRouter = require("./seguimiento.router")
const {AuthController} = require("../controllers")
const AuthMiddleware = require("../middleware/auth.middleware")
const authController = new AuthController()
const publicRouter = require("./public.router")
// const reportRouter = reuire("./reportsRouter")
// Este index va tener todos los routers del sistema que seran exportados por los demas modulos en routers


// MIDDLEWARE  para audiencias   el next es un callback que permite continuar el flujo
// permite responer y seguir con el flujo si no continua con next o responde algo se queda ahi en un bucle sin fin
router.use((req,res,next)=>{
    console.log('MiddleWare -audiencia');
    console.log(req.ip)
    next();
});

// forma 2. el [] es un handler que es un middleware, puedo agregar uno o varios
router.post("/login",authController.login)
router.use( "/users/register/", publicRouter);


router.use("/users",[AuthMiddleware],userRouter)


router.post("/verify",authController.verifyToken)

//forma 1. Asi se puede agregar el middleware a todas las rutas hacia abajo si quiero que se omita aguna debera estar antes del middleware
router.use(AuthMiddleware)


// Establece la ruta para obtener las imagenes en la carpeta estatica
//Todo lo que hay en static internamente el static va redireccionar a la carpeta de docs y va encontrar la imagen
// static es una opcion para capturar directamente los archivos estaticos
router.use('/static/',express.static('docs'))
// El use se usa para decirle al router que rutas va usar, para los metodos http
router.use("/tasks",taskRouter)


// Se exporta para usarse en el index principal



// Middleware 404 
// recibe un callback o un handler para el handler tenemos:
router.use((req,res)=>{
    return res.status(404).json({
        ok:false,
        message: '404 endpoint',

    })
})


module.exports = router



