const mongoose = require("mongoose");

// Database Connection
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log("Not connected", error);
  }
};


module.exports = dbConnection;