const express = require("express")
const router = express.Router()

// importo el router
//Lo mas normal es que por crud se tenga un router
// convencion el prural


const taskRouter = require("./tasks.router")
// const userRouter = require("./users.router")
// const reportRouter = reuire("./reportsRouter")
// Este index va tener todos los routers del sistema que seran exportados por los demas modulos en routers

// El use se usa para decirle al router que rutas va usar, para los metodos http
router.use("/tasks",taskRouter)

// Se exporta para usarse en el index principal



const userRouter = require("./users.router");
const publicRouter = require("./public.router")
const carsRouter = require("./cars.router")

const { AuthController } = require("../controllers");
const { AuthMiddleware } = require("../middleware/auth.middleware");
const authController = new AuthController();
// const reportRouter = require("./reports.router")


router.use("/static/", express.static("docs"));

// audiencia - logs
router.use((req, res, next) => {
  console.log("Middleware - Audiencia");
  next();
});

router.post("/login", authController.login);

router.use( "/users/register/", publicRouter);

router.post("/verify", authController.verifyToken);
router.use(AuthMiddleware);
router.use( "/users", userRouter);


router.use("/cars", carsRouter );


// Handler 404
router.use((req, res) => {
  return res.status(404).json({
    ok: false,
    message: "404 endpoint",
  });
});

module.exports = router



