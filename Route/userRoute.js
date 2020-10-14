const userRoute = require("express").Router();
const userController = require("../Controller/User");

// userRoute.get("/", userController.getAllUsers);
userRoute.get("/:idUser", userController.getUser);
userRoute.post("/createuser", userController.postUser);
userRoute.put("/:idUser", userController.puthUser);
userRoute.delete("/:idUser", userController.deletehUser);
userRoute.get("/", userController.paginationUser);

module.exports = userRoute;
