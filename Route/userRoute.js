const userRoute = require("express").Router();
const userController = require("../Controller/User");
const middlewareVerify = require("../Helper/Middleware");

userRoute.get("/", middlewareVerify,userController.getAllUsers);
userRoute.get("/:idUser",middlewareVerify,userController.getUser);
userRoute.post("/createuser", middlewareVerify,userController.postUser);
userRoute.put("/:idUser", middlewareVerify,userController.puthUser);
userRoute.delete("/:idUser", middlewareVerify,userController.deletehUser);
userRoute.get("/", middlewareVerify,userController.paginationUser);

module.exports = userRoute;
