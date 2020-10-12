const userModel = require("../Model/User");
const jwt = require("jsonwebtoken");

module.exports = {
  getAllUsers: (req, res) => {
    userModel
      .getAllUsers()
      .then((data) => {
        res.status(201).send({
          success: true,
          message: "Success Get Data User",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Failed Get Data USer",
        });
      });
  },

  posthUser: (req, res) => {
    userModel
      .posthUser(req.body)
      .then((data) => {
        res.status(201).send({
          success: true,
          message: "Success Create Data User",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Failed Create Data USer",
        });
      });
  },

  puthUser: (req, res) => {
    const { idUser } = req.params;
    userModel
      .puthUser(req.body, idUser)
      .then((data) => {
        res.status(201).send({
          success: true,
          message: "Success Update Data User",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Failed Update Data USer",
        });
      });
  },

  deletehUser: (req, res) => {
    userModel
      .deletehUser(req.params.idUser)
      .then((data) => {
        res.status(201).send({
          success: true,
          message: "Success Delete Data User",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Failed Delete Data USer",
        });
      });
  },

  loginUser: (req, res) => {
    // const token = jwt.sign(req.body, process.env.DATA_KEY)
    // res.send(token)
    userModel
      .loginhUser(req.body)
      .then((dataLogin) => {
        res.status(201).send({
          success: true,
          message: "Success Login",
          data: dataLogin,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Failed Login",
        });
      });
  },
};
