import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}$`
    );
  } catch (error) {
    console.error("DB Connection Failed : ", error);
    process.exit(1);
  }
};

//================SQL Connection============================

const getSqlConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: SqlDB_Name,
    });
    console.log("sql connected successfully");
    return connection;
  } catch (error) {
    console.log("Sql connection error: => ", error);
    return process.exit(1);
  }
};

export { connectDB, getSqlConnection };
