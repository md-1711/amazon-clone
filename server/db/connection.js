const mongoose = require("mongoose");
require("dotenv").config();
console.log("MONGODB_URI from .env:", process.env.MONGODB_URI);


const Connection = async () => {
  const URL = process.env.MONGODB_URI;

  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error while connecting to MongoDB", error.message);
  }
};

module.exports = Connection;
