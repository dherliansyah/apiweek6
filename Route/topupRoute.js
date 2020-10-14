const topupRoute = require("express").Router();
const topupController = require("../Controller/Topup");

topupRoute.get("/", topupController.getAllTopup);
topupRoute.post("/createtopup", topupController.postTopup);
topupRoute.put("/:idTopup", topupController.putTopup);
topupRoute.delete("/:idTopup", topupController.deleteTopup);

module.exports = topupRoute;
