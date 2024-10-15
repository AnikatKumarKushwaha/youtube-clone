import express from "express";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = 3000;

connectDb();

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`The app is listening at port ${PORT}`);
});
