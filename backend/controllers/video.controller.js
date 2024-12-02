import { Channel } from "../models/channel.model.js";
import { Video } from "../models/video.model.js";

export const createVideo = async (req, res) => {
  const { title, description, videoUrl, category, thumbnailUrl, channelId } =
    req.body;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const newVideo = new Video({
      title,
      description,
      category,
      videoUrl,
      thumbnailUrl,
      channelId,
    });
    await newVideo.save();

    // Add video to the channel
    channel.videos.push(newVideo._id);
    await channel.save();

    res
      .status(201)
      .json({ message: "Video created successfully", video: newVideo });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating video", error: err.message });
  }
};

// Fetch all videos from all channels
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("channelId", "channelName")
      .exec(); // Populates channel info

    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: "No videos found" });
    }

    res.status(200).json(videos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching videos", error: err.message });
  }
};

// Fetch a video by ID
export const getVideoById = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id).populate("channelId", "channelName");
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching video", error: err.message });
  }
};

// Update a video
export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, videoUrl, thumbnailUrl, published } = req.body;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.title = title || video.title;
    video.description = description || video.description;
    video.videoUrl = videoUrl || video.videoUrl;
    video.thumbnailUrl = thumbnailUrl || video.thumbnailUrl;
    video.published = published !== undefined ? published : video.published;

    await video.save();
    res.status(200).json({ message: "Video updated successfully", video });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating video", error: err.message });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const channel = await Channel.findById(video.channelId);
    if (channel) {
      // Remove the video ID from the channel's videos array
      channel.videos = channel.videos.filter((vid) => vid.toString() !== id);
      await channel.save();
    }

    // Use findByIdAndDelete to delete the video
    await Video.findByIdAndDelete(id);

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting video", error: err.message });
  }
};

// Add a comment to a video
export const addComment = async (req, res) => {
  const { id } = req.params; // Video ID
  const { text, userId } = req.body;
  console.log(req.body);

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.comments.push({ text, userId });
    await video.save();
    res.status(201).json({ message: "Comment added successfully", video });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: err.message });
  }
};

// Fetch comments of a video
export const getComments = async (req, res) => {
  const { id } = req.params; // Video ID

  try {
    const video = await Video.findById(id).populate(
      "comments.userId",
      "name email"
    );
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video.comments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: err.message });
  }
};

export const likeVideos = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } }, // Increment the likes count by 1
      { new: true } // Return the updated document
    );
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
