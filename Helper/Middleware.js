const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {

  otentication : (req, res, next) =>{
    const bearearToken = req.header("auth-token");

    if(!bearearToken){
      res.status(401).send({
        success : false,
        message : "NOT FOUND",
      })
    }else{
      const token = bearearToken.split(" ")[1];
      jwt.verify(token, process.env.DATA_KEY,(err, decoded)=>{
        if(err){
          res.status(401).send({
            success: false,
            message: "Error Forbidden",
          })
        }else{
          req.decoded = decoded;
          next();
        }
      })
    }
  },

  otoritation : (req, res, next) =>{
    const role = req.decoded.role;
    const idUser = req.decoded.idUser
    if(role == 20) next();
    else if(idUser == req.params.idUser) next();
    else{
      res.status(401).send({
        success:false,
        message: "Error Cuyy"
      })
    }

  }
  }






