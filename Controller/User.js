const userModel = require("../Model/User");

module.exports = {
  getAllUsers: (req, res) => {
    userModel
      .getAllUsers()
      .then((data) => {
        res.status(200).send({
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

  getUser: (req, res) => {
    const { idUser } = req.params;
    userModel
      .getUser(req.body, idUser)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Succes Get By ID",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Failed Get Data User",
        });
      });
  },

  postUser: (req, res) => {
    userModel
      .postUser(req.body)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Success Create Data User",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Failed Create Data User",
        });
      });
  },

  puthUser: (req, res) => {
    const { idUser } = req.params;
    userModel
      .puthUser(req.body, idUser)
      .then((data) => {
        res.status(200).send({
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
        res.status(200).send({
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

  paginationUser: (req,res)=>{
    let {page, limit} = req.query
    userModel
    .paginationUser(req.body, page,limit)
    .then((data)=>{
      res.status(200).send({
        success : true,
        message : "Success Pagination Data User",
        data : data,
      })
    })
      .catch((err)=>{
        res.status(400).send({
          success : false,
          message : "Failed Pagination Data User",
        })
      })
  },
};
