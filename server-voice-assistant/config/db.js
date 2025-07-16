const mongoose = require("mongoose");

const dbConnection = async () => {
 
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = dbConnection;
