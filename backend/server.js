import express from "express";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import channelRoutes from "./routes/channel.routes.js";
import videoRoutes from "./routes/videos.routes.js";
import cors from "cors";

const app = express();
const PORT = 3000;

connectDb();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/video", videoRoutes);

app.listen(PORT, () => {
  console.log(`The app is listening at port ${PORT}`);
});
