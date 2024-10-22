import express from "express";
import {
  createVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  addComment,
  getComments,
  getAllVideos,
} from "../controllers/video.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createVideo);
router.put("/:id", authenticate, updateVideo);
router.delete("/:id", authenticate, deleteVideo);

// Fetch all videos or a specific video
router.get("/", getAllVideos);
router.get("/:id", getVideoById);

// Comments Management (Authenticated routes)
router.post("/:id/comments", authenticate, addComment);
router.get("/:id/comments", getComments);

export default router;
