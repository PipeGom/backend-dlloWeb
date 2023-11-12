const express = require("express");

const router = express.Router();

const taskRouter = require("./tasks.router");
const userRouter = require("./users.router");
const publicRouter = require("./public.router")

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

router.use("/tasks", taskRouter);

// Handler 404
router.use((req, res) => {
  return res.status(404).json({
    ok: false,
    message: "404 endpoint",
  });
});

module.exports = router;
