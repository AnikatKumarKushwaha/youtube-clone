import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createChannel,
  deleteChannel,
  getChannelById,
  updateChannel,
} from "../controllers/channel.controller.js";

const router = express.Router();

router.post("/", authenticate, createChannel);
router.get("/:id", getChannelById);
router.put("/:id", authenticate, updateChannel);
router.delete("/:id", authenticate, deleteChannel);

export default router;
