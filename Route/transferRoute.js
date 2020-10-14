const transferRoute = require("express").Router();
const transferController = require("../Controller/Transfer");
const middlewareVerify = require("../Helper/Middleware");

transferRoute.get("/", transferController.getAllTransfer);
transferRoute.post("/createtransfer", middlewareVerify,transferController.postTransfer);
transferRoute.delete("/:idTransfer", middlewareVerify,transferController.deleteTransfer);
transferRoute.put("/:idTransfer", middlewareVerify,transferController.updateTransfer);
transferRoute.get("/search", transferController.searchTransfer);


module.exports = transferRoute;
