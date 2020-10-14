const topupModel = require("../Model/Topup");
const jwt = require("jsonwebtoken");

module.exports = {
  getAllTopup: (req, res) => {
    topupModel
      .getAllTopup()
      .then((data) => {
        res.status(201).send({
          success: true,
          message: "Success Get Data Topup",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Failed Get Data Topup",
        });
      });
  },

  postTopup: (req, res) => {
    topupModel
      .postTopup(req.body)
      .then((data) => {
        res.status(201).send({
          success: true,
          message: "Success Create Data Topup",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Failed Create Data Topup",
        });
      });
  },

  putTopup: (req, res) => {
    const { idTopup } = req.params;
    topupModel
      .putTopup(req.body, idTopup)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Success Update Data Topup",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Failed Update Data Topup",
        });
      });
  },

  deleteTopup: (req, res) => {
    topupModel
      .deleteTopup(req.params.idTopup)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Success Delete Data Topup",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Success Delete Data Topup",
        });
      });
  },
};
