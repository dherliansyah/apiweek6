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
          message: "Failed Get Data User",
        });
      });
  },

  searchAll: (req, res) => {
    const {idUser} = req.decoded
    userModel
      .searchAll(idUser)
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
          message: "Failed Get Data User",
        });
      });
  },

  getUser: (req, res) => {
    // const { idUser } = req.params;
    const {idUser} = req.decoded
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
    req.body.photo = (req.file ? req.file.filename : '');
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

  // puthUser: (req, res) => {
  //   const { idUser } = req.params;
  //   req.body.photo = (req.file ? req.file.filename : '');
  //   userModel
  //     .puthUser(req.body, idUser)
  //     .then((data) => {
  //       res.status(200).send({
  //         success: true,
  //         message: "Success Update Data User",
  //         data: data,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(400).send({
  //         success: false,
  //         message: "Failed Update Data User",
  //       });
  //     });
  // },

  updateUser: (req, res) => {
    userModel
      .updateUser(req.params, req.body)
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
          message: "Failed Update Data User",
        });
      });
  },

  updatePin: async function (req, res) {
    try {
      const idUser = req.params;
      const pin = req.body.pin;
      const result = await userModel.updatePin(idUser.idUser, pin);
      if (!result.affectedRows > 0) {
        res.status(200).send({
          message: `Success update pin number!`,
          data: result,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Failed update pin number",
          data: data,
        });
      }
    }catch (err) {
        res.send({
          success: false,
          message: "Failed Update Data User aja",
        });
      }
    },

    nameUpdate: async function (req, res) {
      try {
        const idUser = req.params;
        const username = req.body.username;
        const result = await userModel.nameUpdate(idUser.idUser, username);
        if (!result.affectedRows > 0) {
          res.status(200).send({
            message: `Success update username`,
            data: result,
          });
        } else {
          res.status(400).send({
            success: false,
            message: "Failed update username",
            data: data,
          });
        }
      }catch (err) {
          res.send({
            success: false,
            message: "Failed Update username aja",
          });
        }
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

  searchUser: (req,res)=>{
    const { q } = req.query
    // const { query } = req.query
    const {idUser} = req.decoded
    userModel
    .searchUser(q, idUser)
    .then((data)=>{
      res.status(200).send({
        success : true,
        message : "Success Search Data Transfer",
        data : data,
      })
    })
    .catch((err)=>{
      res.status(400).send({
        success : false,
        message : "Failed Search Data Transfer Aja",
      })
    })
  },

  updatePhone: async function (req, res) {
    try {
      const idUser = req.params;
      const phone = req.body.phone;
      const result = await userModel.updatePhone(idUser.idUser, phone);
      if (!result.affectedRows > 0) {
        res.status(200).send({
          message: `Success update phone number`,
          data: result,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Failed update phone number",
          data: data,
        });
      }
    }catch (err) {
        res.send({
          success: false,
          message: "Failed update phone number aja",
        });
      }
    },

    uploadPhoto: (req, res) => {
      const setData = req.body;
      if (req.file) {
        setData.photo = req.file.filename;
        userModel
          .uploadPhoto(req.params, { photo: req.file.filename })
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
      } else {
        res.send({
          status: 500,
          message: [],
        });
      }
    },

    getUserSearch: (req, res) => {
      const {username, page, limit} = req.query
      userModel
      .getUserSearch(req.body, username, page, limit)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Success search User",
          data: data,
        });
      })
        .catch((err) => {
          res.send({
            success: false,
            message: 'failed search name and short'
          })
        });
    },
};
