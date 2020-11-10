const userRoute = require("express").Router();
const authController = require("../Controller/Auth");
const upload = require("../Helper/Upload");


userRoute.post("/register", upload, authController.posthUser);
userRoute.post("/login", authController.login);

module.exports = userRoute;
