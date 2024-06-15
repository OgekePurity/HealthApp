require('dotenv').config();
const mongoose = require('mongoose');

url = process.env.MONGO_URI

const connectDB = () => {
  return mongoose.connect(url);
  console.log("connected to MongoDB")
};
module.exports = connectDB;
