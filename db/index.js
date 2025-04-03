import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    return connection;
  } catch (error) {
    console.log("error connecting to database : ", error);
  }
};

export default connectDb;
