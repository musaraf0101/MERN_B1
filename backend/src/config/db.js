import mongoose from "mongoose";

 const DBConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("db connected");
  } catch (error) {
    console.log("db error", error);
  }
};

export default DBConnection