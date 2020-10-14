const userRoute = require("express").Router();
const authController = require("../Controller/Auth");


userRoute.post("/register", authController.posthUser);
userRoute.get("/login", authController.loginUser);

module.exports = userRoute;
