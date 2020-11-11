const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {

  otentication : (req, res, next) =>{
    const bearearToken = req.header("auth-token");

    if(!bearearToken){
      res.status(401).send({
        success : false,
        message : "gagal cuyy",
      })
    }else{
      // const token = bearearToken.split(" ")[1];
      jwt.verify(bearearToken, process.env.DATA_KEY,(err, decoded)=>{
        if(err){
          res.status(401).send({
            success: false,
            message: "Error Forbidden Cuyy",
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
    // console.log(role)
    const idUser = req.decoded.idUser
    if(role == "admin") next();
    else if(idUser == req.params.idUser) next();
    else{
      res.status(401).send({
        success:false,
        message: "Error Cuyy"
      })
    }

  }
  }






