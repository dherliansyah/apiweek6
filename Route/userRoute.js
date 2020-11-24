const userRoute = require("express").Router();
const userController = require("../Controller/User");
const middlewareVerify = require("../Helper/Middleware");
const upload = require("../Helper/Upload");

userRoute.get("/", middlewareVerify.otentication, userController.getAllUsers);
userRoute.get("/searchall", middlewareVerify.otentication, userController.searchAll);
userRoute.get("/search/query", middlewareVerify.otentication, userController.searchUser);
userRoute.get("/:idUser", middlewareVerify.otentication, middlewareVerify.otoritation, userController.getUser);
userRoute.post("/createuser",middlewareVerify.otentication, middlewareVerify.otoritation,userController.postUser);
userRoute.patch("/phone/:idUser",middlewareVerify.otentication, middlewareVerify.otoritation,userController.updatePhone);
userRoute.patch("/username/:idUser",middlewareVerify.otentication, middlewareVerify.otoritation,userController.nameUpdate);
userRoute.patch("/:idUser",middlewareVerify.otentication, middlewareVerify.otoritation, userController.updateUser);
userRoute.patch("/photo/:idUser",upload, middlewareVerify.otentication, middlewareVerify.otoritation, userController.uploadPhoto);
userRoute.patch("/pin/:idUser",middlewareVerify.otentication, middlewareVerify.otoritation, userController.updatePin);
userRoute.delete("/:idUser", middlewareVerify.otentication, middlewareVerify.otoritation,userController.deletehUser);

module.exports = userRoute;
