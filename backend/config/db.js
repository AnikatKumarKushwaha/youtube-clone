import mongoose from "mongoose";

export async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017/Youtube-clone");

  const db = mongoose.connection;

  db.on("open", () => {
    console.log("connection succesful");
  });
  db.on("error", (err) => {
    console.log("connection failed: ", err);
  });
}
