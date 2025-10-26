const mongoose = require("mongoose");

const { getSecretKey } = require("/opt/nodejs/secret/secret-manager.js");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");

    return;
  }

  try {
    const key = "MONGO_URI";

    const MONGO_URI = await getSecretKey(key);

    if (!MONGO_URI) {
      throw new Error("MONGO_URI not found in secrets");
    }

    mongoose.set("bufferCommands", false);

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,

      useUnifiedTopology: true,

      serverSelectionTimeoutMS: 30000, // 30 seconds

      socketTimeoutMS: 45000, // 45 seconds

      connectTimeoutMS: 30000, // 30 seconds

      maxPoolSize: 10,

      minPoolSize: 5,

      // Lambda-specific settings

      maxIdleTimeMS: 30000,

      heartbeatFrequencyMS: 10000,
    });

    isConnected = true;

    console.log("MongoDB Connected");

    console.log(mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);

    throw new Error("Database connection error");
  }
};

module.exports = connectDB;
