import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createChannel,
  deleteChannel,
  getChannelByChannelId,
  getChannelById,
  getChannelVideos,
  updateChannel,
} from "../controllers/channel.controller.js";

const router = express.Router();

router.post("/", authenticate, createChannel);
router.get("/channel/:channelId", getChannelByChannelId);
router.get("/videos/:channelId", getChannelVideos);
router.get("/user/:userId", getChannelById);
router.put("/:id", authenticate, updateChannel);
router.delete("/:id", authenticate, deleteChannel);

export default router;
