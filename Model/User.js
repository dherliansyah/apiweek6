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

  searchAll: (idUser) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user WHERE idUser <> ? ORDER BY firstName ASC", idUser, (err, res) => {
        if (!err) {
          resolve(res);
        }
        reject(err);
      });
    });
  },

  searchUser: function (query, idUser) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user WHERE username LIKE '%${query}%' AND idUser <> ${idUser} ORDER BY firstName ASC`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
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

  updatePin: (idUser, pin) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE user SET pin= ${pin} WHERE idUser=${idUser} `;
      db.query(query, (err) => {
        if (!err) {
          resolve(resolve);
        } else {
          reject(reject);
        }
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

  updatePhone: (idUser, phone) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE user SET phone= ${phone} WHERE idUser=${idUser} `;
      db.query(query, (err) => {
        if (!err) {
          resolve(resolve);
        } else {
          reject(reject);
        }
      });
    });
  },

  nameUpdate: (idUser, username) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE user SET username='${username}' WHERE idUser=${idUser} `;
      db.query(query, (err) => {
        if (!err) {
          resolve(resolve);
        } else {
          reject(reject);
        }
      });
    });
  },

 uploadPhoto: (params, body) => {
    const { photo } = body;
    const { idUser } = params;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT photo FROM user WHERE idUser=${idUser}`,
        (err, res) => {
          if (!err) {
            const data = Object.entries(body).map((item) => {
              return parseInt(item[1]) 
                ? `${item[0]} = ${item[1]}`
                : `${item[0]} = ${item[1]}`;
            });

            db.query(
              `UPDATE user SET photo = '${photo}' WHERE idUser=${idUser}`,
              (err, res) => {
                if (!err) {
                  resolve(res);
                } else {
                  reject(err);
                }
              }
            );
          } else {
            reject(err);
          }
        }
      );
    });
  },

};

module.exports = userModel;
