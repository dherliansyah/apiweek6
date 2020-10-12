const userRoute = require("express").Router();
const userController = require("../Controller/User");
const authController = require("../Controller/Auth");

userRoute.get("/", userController.getAllUsers);
userRoute.put("/:idUser", userController.puthUser);
userRoute.delete("/:idUser", userController.deletehUser);
userRoute.post("/register", authController.posthUser);
userRoute.get("/login", authController.loginUser);

module.exports = userRoute;
