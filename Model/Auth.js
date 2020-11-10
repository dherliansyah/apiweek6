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

  login: (body)=> {
    return new Promise((resolve, reject) => {
        const { email, password } = body;
        const query = "SELECT * FROM user WHERE email=?"
        db.query(query, email, (err, data) => {
            let dataUser = data[0]
            if(!data.length) {
                reject('email is wrong')
                // console.log('email/password is wrong')
            } else {
                if(!err) { 
                    // resolve(data[0]);
                    const token = jwt.sign({
                                 role: data.role,
                idUser: data.idUser,
                firstName: data.firstName,
                    
                    }, process.env.DATA_KEY)

                    //untuk mengecek
                    bcrypt.compare(password, dataUser.password, function(err, result) {
                        if(err) {
                            reject('password is wrong')
                        } else {
                            if(!result) {
                                reject('password is wrong')
                            } else {
                                const sql = 'SELECT * FROM user WHERE password=?'
                                db.query(sql, dataUser.password, (err, data) => {
                                  if (!err) {
                                         resolve({ token, role: dataUser.role, idUser: dataUser.idUser });
                                         } else {
                                            reject();
                                         }
                                });
                            }
                        }
                    });
                } else {
                    reject(err);
                }
            }
        });
    });
},

  // loginhUser: (body) => {
  //   return new Promise((resolve, reject) => {
  //     const { email, password } = body;
  //     const query = "SELECT * FROM user WHERE email=?";
  //     db.query(query, email, (err, dataLogin) => {
  //       let data = dataLogin[0];
  //       if (!dataLogin.length) {
  //         reject();
  //       } else {
  //         if (!err) {
  //           const token = jwt.sign(
  //             {
  //               role: data.role,
  //               idUser: data.idUser,
  //               firstName: data.firstName,
  //             },
  //             process.env.DATA_KEY
  //           );

  //           bcrypt.compare(password, data.password, (err, result) => {
  //             if (err) {
  //               reject();
  //             } else {
  //               if (!result) {
  //                 reject();
  //               } else {
  //                 const sql = "SELECT * FROM user WHERE password=?";
  //                 db.query(sql, data.password, (err) => {
  //                   if (!err) {
  //                     resolve({ token, role: data.role, idUser: data.idUser });
  //                   } else {
  //                     reject();
  //                   }
  //                 });
  //               }
  //             }
  //           });
  //         } else {
  //           reject();
  //         }
  //       }
  //     });
  //   });
  // },
};

module.exports = authModel;
