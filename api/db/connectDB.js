import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    const DB = {
      dbName: "blogapp",
    };
    await mongoose.connect(DATABASE_URL, DB);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
