import mongoose from "mongoose";

export async function connectDb() {
  await mongoose.connect(
    "mongodb+srv://anikat1999akas:QxDA7eHgDSZAR2yB@cluster0.xmp1r.mongodb.net/"
  );

  const db = mongoose.connection;

  db.on("open", () => {
    console.log("connection succesful");
  });
  db.on("error", (err) => {
    console.log("connection failed: ", err);
  });
}
