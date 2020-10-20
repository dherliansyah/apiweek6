const transferRoute = require("express").Router();
const transferController = require("../Controller/Transfer");
const middlewareVerify = require("../Helper/Middleware");

transferRoute.get("/", middlewareVerify.otentication, transferController.getAllTransfer);
transferRoute.get("/search", middlewareVerify.otentication, transferController.searchTransfer);
transferRoute.post("/createtransfer", middlewareVerify.otentication ,transferController.postTransfer);
transferRoute.put("/:idTransfer", middlewareVerify.otentication, middlewareVerify.otoritation, transferController.updateTransfer);
transferRoute.delete("/:idTransfer", middlewareVerify.otentication, middlewareVerify.otoritation ,transferController.deleteTransfer);

module.exports = transferRoute;
