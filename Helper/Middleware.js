const jwt = require("jsonwebtoken");

const middlewareVerify = (req, res, next) => {
  const bearearToken = req.header("auth-token");
  const token = bearearToken.split(" ")[1];
  if (!token) {
    res.status(401).send({
      success: false,
      message: "NOT FOUND",
    });
  } else {
    jwt.verify(token, process.env.DATA_KEY, (err, decode) => {
      if (!err) {
        if (decode.role == "20") next();
          else if(decode.idUser == req.params.idUser)next();
         else {
          res.status(400).send({
            success: false,
            message: "Error Forbidden",
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message: err,
        });
      }
    });
  }
};

module.exports = middlewareVerify;