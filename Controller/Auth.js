const authModel = require("../Model/Auth");

module.exports = {
  posthUser: (req, res) => {
    authModel
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

  loginUser: (req, res) => {
    // const token = jwt.sign(req.body, process.env.DATA_KEY)
    // res.send(token)
    authModel
      .loginhUser(req.body)
      .then((dataLogin) => {
        res.status(201).send({
          success: true,
          message: "Success Login",
          token: dataLogin,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: "Email / Password Salah",
        });
      });
  },
};
