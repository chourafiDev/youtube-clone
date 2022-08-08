import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  if (mongoose.connect.readyState >= 1) {
    return;
  }

  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    //check database is connected
    .then((con) => console.log("Connected to database!"));
};

export default dbConnect;
