const topupRoute = require("express").Router();
const topupController = require("../Controller/Topup");
const middlewareVerify = require("../Helper/Middleware");

topupRoute.get("/", topupController.getAllTopup);
topupRoute.post("/createtopup", middlewareVerify,topupController.postTopup);
topupRoute.put("/:idTopup", middlewareVerify,topupController.putTopup);
topupRoute.delete("/:idTopup", middlewareVerify,topupController.deleteTopup);

module.exports = topupRoute;
