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
      const { email, password } = body;
      const query = "SELECT * FROM user WHERE email=?";
      db.query(query, email, (err, dataLogin) => {
        let data = dataLogin[0];
        if (dataLogin.length < 1) {
          reject();
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
            
            bcrypt.compare(password, data.password, (err, result)=>{
              if(err){
                reject()
              }else{
                if(!result){
                  reject()
                }else{
                  const sql = "SELECT * FROM user WHERE password=?";
                  db.query(sql, data.password, (err)=>{
                    if(!err){
                      resolve(token)
                    } else{
                      reject()
                    }
                  })
                }
              }
            })

          } else {
            reject();
          }
        }
      });
    });
  },
};

module.exports = authModel;
