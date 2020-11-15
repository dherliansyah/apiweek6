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

  // puthUser: (body, idUser) => {
  //   return new Promise((resolve, reject) => {
  //     bcrypt.genSalt(5, function (err, salt) {
  //       const { password } = body;
  //       bcrypt.hash(password, salt, function (err, hashedPassword) {
  //         const newBody = { ...body, password: hashedPassword };
  //         if (err) {
  //           reject(err);
  //         } else {
  //           // const {idUser} = params;
            
  //           const query = `UPDATE user SET ? WHERE idUser = ${idUser} `;
  //           db.query(query, newBody, (err) => {
  //             if (!err) {
  //               resolve(newBody);
  //             } else {
  //               reject(err);
  //             }
  //           });
  //         }
  //       });
  //     });
  //   });
  // },

  updateUser: (params, body) => {
    const { idUser } = params;
    return new Promise((resolve, reject) => {
        console.log(body.password.length)
      if (body.password.length > 0 || body.pin.length > 0) {
        bcrypt.genSalt(10, function (err, salt) {
          //start hash password
          const { password } = body;
          bcrypt.hash(password, salt, function (err, hashedPassword) {
            const newBody = { ...body, password: hashedPassword };
            if (err) {
              reject(err);
            }
            let query = `UPDATE user SET ? WHERE idUser=?`;
            db.query(query, [newBody, idUser], (err, res) => {
              if (!err) {
                resolve(newBody);
              } else {
                reject("Failed to Update User aja");
              }
            });
          });
        });
      } else {
        let query = `UPDATE user SET ? WHERE idUser=?`;
        db.query(query, [body, idUser], (err, res) => {
          if (!err) {
            resolve(body);
          } else {
            reject("Failed to Update User");
          }
        });
      }
    });
  },

  // patchProfile: (body, idUser) => {
  //   return new Promise((resolve, reject) => {
  //     bcrypt.genSalt(5, function (err, salt) {
  //     const {
  //       firstName,
  //       lastName,
  //       username,
  //       email,
  //       password,
  //       phone,
  //       balance,
  //       verified,
  //       photo,
  //       pin,
  //       role,
  //     } = body;

  //       bcrypt.hash(password, salt, function (err, hashedPassword) {
  //       const newBody = { ...body, password: hashedPassword };
  //       console.log(newBody);
  //       if (err) {
  //         reject(err);
  //       }
  //       db.query(
  //         `SELECT * FROM user WHERE idUser=${idUser}`,
  //         body,
  //         (err, result) => {
  //           if (!err) {
  //             if (result.length) {
  //               const data = Object.entries(body).map((item) => {
  //                 return parseInt(item[1]) > 0
  //                   ? `${item[0]}=${item[1]}`
  //                   : `${item[0]}='${item[1]}'`;
  //               });
  //               const query = `UPDATE user SET ${data} WHERE idUser=${idUser}`;
  //           db.query(query, newBody, (err) => {
  //             if (data) {
  //               resolve(newBody);
  //             } else {
  //               reject(err);
  //             }
  //           });
  //             } else {
  //               reject("id not found");
  //             }
  //           } else {
  //             reject("Failed update Profile");
  //           }
  //         }
  //       );
  //     });
  //   });
  //   });
  // },

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
