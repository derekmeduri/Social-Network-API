require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  //node looks for env variable and will use it, if not it will run locally
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network-API"
);

module.exports = mongoose.connection;
