const db = require("../Helper/db");

const transferModel = {
    getAllTransfer: () => {
    return new Promise((resolve, reject) => {
      db.query("select * from user join transfer on user.idUser = transfer.idUser", (err, res) => {
        if (!err) {
          resolve(res);
        }
        reject(err);
      });
    });
  },

  postTransfer: (body)=>{
      return new Promise((resolve, reject)=>{
          const query = "INSERT INTO transfer SET?";
          db.query(query,body, (err,data)=>{
              if(!err){
                  resolve(data);
              }else{
                  reject(err);
              }
          })
      })
  },

  deleteTransfer:(params)=>{
      return new Promise((resolve,reject)=>{
          const query = "DELETE FROM transfer WHERE idTransfer=?"
          db.query(query,params,(err,res)=>{
              if(!err){
                  resolve(res)
              }else{
                  reject(err)
              }
          })
      })
  },

  updateTransfer:(body, idTransfer)=>{
      return new Promise((resolve,reject)=>{
          const query = `UPDATE transfer SET? WHERE idTransfer=${idTransfer}`
          db.query(query,body, (err,res)=>{
              if(!err){
                  resolve(res)
              }else{
                  reject(err)
              }
          })
      })
  },

  searchTransfer:(body, firstname)=>{
      return new Promise((resolve,reject)=>{
          const query = `SELECT * FROM user WHERE firstName LIKE '%${firstname}%' ORDER BY firstname asc`
          db.query(query,body, (err,data)=>{
              if(!err){
                  resolve(data)
              }else{
                  reject(err)
              }
          })
      })
  },
}



module.exports = transferModel;
