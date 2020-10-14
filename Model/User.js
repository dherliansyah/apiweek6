const db = require("../Helper/db");
const bcrypt = require("bcrypt");

const userModel = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user ORDER BY firstName ASC", (err, res) => {
        if (!err) {
          resolve(res);
        }
        reject(err);
      });
    });
  },

  postUser: (body) => {
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

  puthUser: (body, idUser) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(5, function (err, salt) {
        const { password } = body;
        bcrypt.hash(password, salt, function (err, hashedPassword) {
          const newBody = { ...body, password: hashedPassword };
          if (err) {
            reject(err);
          } else {
            // const {idUser} = params;
            const query = `UPDATE user SET ? WHERE idUser = ${idUser} `;
            db.query(query, newBody, (err) => {
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

  getUser: (body, idUser) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE idUser=${idUser}`;
      db.query(query, body, (err, res) => {
        if (!err) {
          resolve(res[0]);
        } else {
          reject(err);
        }
      });
    });
  },

  deletehUser: (cek) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM user WHERE idUser=? ";
      db.query(query, cek, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  paginationUser: (body, page,limit)=>{
    return new Promise((resolve,reject)=>{
      
      if(!limit){
        limit = 4;
      }else{
        limit = parseInt(limit);
      }

      if(!page){
        page =1;
      }else{
        page = parseInt(page);
      }

      const query = `SELECT * FROM user LIMIT ${limit} OFFSET ${(page-1)*limit}`
      db.query(query,body, (err,res)=>{
        if(!err){
          resolve(res)
        }else{
          reject(err)
        }
      })
    })
  },
};

module.exports = userModel;
