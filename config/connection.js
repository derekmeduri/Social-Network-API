require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_ || "mongodb://127.0.0.1:27017/social-network-API"
);

module.exports = mongoose.connection;
