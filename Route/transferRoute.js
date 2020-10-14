const transferRoute = require("express").Router();
const transferController = require("../Controller/Transfer");

transferRoute.get("/", transferController.getAllTransfer);
transferRoute.post("/createtransfer", transferController.postTransfer);
transferRoute.delete("/:idTransfer", transferController.deleteTransfer);
transferRoute.put("/:idTransfer", transferController.updateTransfer);
transferRoute.get("/search", transferController.searchTransfer);


module.exports = transferRoute;
