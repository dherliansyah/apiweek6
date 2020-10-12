const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoute = require("./Route/allRoute");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/user", userRoute);

app.listen(process.env.DEFAULT_PORT, () => {
  console.log(`server running on port ${process.env.DEFAULT_PORT}`);
});
