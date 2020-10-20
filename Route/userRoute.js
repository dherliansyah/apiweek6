const userRoute = require("express").Router();
const userController = require("../Controller/User");
const middlewareVerify = require("../Helper/Middleware");

// userRoute.get("/", middlewareVerify.otentication, userController.getAllUsers);
userRoute.get("/:idUser", middlewareVerify.otentication, middlewareVerify.otoritation, userController.getUser);
userRoute.post("/createuser", middlewareVerify.otentication, middlewareVerify.otoritation,userController.postUser);
userRoute.put("/:idUser", middlewareVerify.otentication, middlewareVerify.otoritation, userController.puthUser);
userRoute.delete("/:idUser", middlewareVerify.otentication, middlewareVerify.otoritation,userController.deletehUser);
userRoute.get("/", middlewareVerify.otentication, userController.paginationUser);

module.exports = userRoute;
