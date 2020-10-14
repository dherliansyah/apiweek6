const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoute = require("./Route/userRoute");
const authRoute = require("./Route/authRoute");
const topupRoute = require("./Route/topupRoute");
const transferRoute = require("./Route/transferRoute");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/topup", topupRoute);
app.use("/api/v1/transfer", transferRoute)

app.listen(process.env.DEFAULT_PORT, () => {
  console.log(`server running on port ${process.env.DEFAULT_PORT}`);
});
