const express = require("express");
const app = express();
var cors = require('cors');
const bodyParser = require("body-parser");
const userRoute = require("./Route/userRoute");
const authRoute = require("./Route/authRoute");
const topupRoute = require("./Route/topupRoute");
const transferRoute = require("./Route/transferRoute");
const db = require("./Helper/db");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("dotenv").config();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/topup", topupRoute);
app.use("/api/v1/transfer", transferRoute);

io.on("connection", (socket) => {
  console.log("data connect");

  socket.on("data-user", (user) =>{
    console.log("ini hasil dari data-user", user);
      if(user){
        socket.join(user);
        console.log("datanya adalah ini: ", user);
        db.query(
          `SELECT balance FROM user WHERE idUser=${user}`,
          (err,res) =>{
            console.log(res, "coba");
            io.to(user).emit("get-data", res[0].balance);
          }
        );
      }
  });

  socket.on("disconnect", () =>{
    console.log("data disconnect to socket or server");
  });
});

server.listen(process.env.DEFAULT_PORT, () => {
  console.log(`server running on port ${process.env.DEFAULT_PORT}`);
});
