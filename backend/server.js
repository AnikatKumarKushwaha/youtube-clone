import express from "express";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import channelRoutes from "./routes/channel.routes.js";

const app = express();
const PORT = 3000;

connectDb();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/channel", channelRoutes);

app.listen(PORT, () => {
  console.log(`The app is listening at port ${PORT}`);
});
