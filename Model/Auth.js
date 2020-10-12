const db = require("../Helper/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = {
  posthUser: (body) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(5, function (err, salt) {
        const { password } = body;
        bcrypt.hash(password, salt, function (err, hashedPassword) {
          const newBody = { ...body, password: hashedPassword };
          if (err) {
            reject(err);
          } else {
            const query = "INSERT INTO user SET?";
            db.query(query, newBody, (err, data) => {
              if (!err) {
                resolve(newBody);
              } else {
                reject(err);
              }
            });
          }
        });
      });
    });
  },

  loginhUser: (body) => {
    return new Promise((resolve, reject) => {
      const { email } = body;
      const query = "SELECT * FROM user WHERE email=?";
      db.query(query, email, (err, dataLogin) => {
        let data = dataLogin[0];
        if (dataLogin.length < 1) {
          console.log("Email / Password Salah");
        } else {
          if (!err) {
            const token = jwt.sign(
              {
                email: data.email,
                idUser: data.idUser,
                username: data.username,
              },
              process.env.DATA_KEY
            );
            resolve(token);
          } else {
            reject(err);
          }
        }
      });
    });
  },
};

module.exports = authModel;
