const db = require("../Helper/db");

const topupModel = {
  getAllTopup: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM topup", (err, data) => {
        if (!err) {
          resolve(data);
        }
        reject(err);
      });
    });
  },

  putTopup: (body, idTopup) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE topup SET ? WHERE idTopup = ${idTopup} `;
      db.query(query, body, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  postTopup: (body) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO topup SET?";
      db.query(query, body, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  deleteTopup: (params) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM topup WHERE idTopup=?";
      db.query(query, params, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
module.exports = topupModel;
