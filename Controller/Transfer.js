const transferModel = require("../Model/Transfer");

module.exports = {
    getAllTransfer: (req, res) => {
        transferModel
        .getAllTransfer()
        .then((data) => {
          res.status(201).send({
            success: true,
            message: "Success Get Data Transfer",
            data: data,
          });
        })
        .catch((err) => {
          res.status(400).send({
            success: false,
            message: "Failed Get Data Transfer",
          });
        });
    },

    postTransfer: (req, res) => {
        transferModel
        .postTransfer(req.body)
        .then((data) => {
          res.status(201).send({
            success: true,
            message: "Success Create Data Transfer",
            data: data,
          });
        })
        .catch((err) => {
          res.status(400).send({
            success: false,
            message: "Failed Create Data Transfer",
          });
        });
    },

    deleteTransfer: (req,res)=>{
        transferModel
        .deleteTransfer(req.params.idTransfer)
        .then((data)=>{
            res.status(200).send({
                success : true,
                message : "Success Delete Data Transfer",
                data : data,
            })
          })
        .catch((err)=>{
            res.status(400).send({
                success : false,
                message : "Failed Delete Data Transfer",
            })
        })
    },

    updateTransfer: (req,res)=>{
        const { idTransfer} = req.params
        transferModel
        .updateTransfer(req.body, idTransfer)
        .then((data)=>{
            res.status(200).send({
                success : true,
                message : "Success Update Data Transfer",
                data : data,
            })
          })
        .catch((err)=>{
            res.status(400).send({
                success : false,
                message : "Failed Update Data Transfer",
            })
        })
    },

    searchTransfer: (req,res)=>{
      const { firstname } = req.query
      transferModel
      .searchTransfer(req.body, firstname)
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
          message : "Failed Search Data Transfer",
        })
      })
    }
  

  };
  