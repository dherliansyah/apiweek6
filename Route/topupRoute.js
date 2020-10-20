const topupRoute = require("express").Router();
const topupController = require("../Controller/Topup");
const middlewareVerify = require("../Helper/Middleware");

topupRoute.get("/", middlewareVerify.otentication, topupController.getAllTopup);
topupRoute.post("/createtopup", middlewareVerify.otentication, middlewareVerify.otoritation,topupController.postTopup);
topupRoute.put("/:idTopup", middlewareVerify.otentication, middlewareVerify.otoritation,topupController.putTopup);
topupRoute.delete("/:idTopup", middlewareVerify.otentication, middlewareVerify.otoritation,topupController.deleteTopup);

module.exports = topupRoute;
