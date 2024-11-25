import { Channel } from "../models/channel.model.js";

export const createChannel = async (req, res) => {
  const { channelName, description } = req.body;

  const userId = req.user.userId;

  try {
    const newChannel = new Channel({ channelName, description, owner: userId });
    await newChannel.save();
    res
      .status(201)
      .json({ message: "Channel created sucessfully", channel: newChannel });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating channel", error: err.message });
  }
};

export const getChannelByChannelId = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId).populate("videos");

    if (!channel) {
      return res
        .status(404)
        .json({ message: "Channel not found for the given ID" });
    }

    res.status(200).json(channel);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching channel", error: err.message });
  }
};

export const getChannelById = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the channel where the owner matches the userId
    const channel = await Channel.findOne({ owner: userId }).populate("videos");

    if (!channel) {
      return res
        .status(404)
        .json({ message: "No channel found for the given user ID" });
    }

    res.status(200).json(channel);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching channel", error: err.message });
  }
};

export const updateChannel = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user.userId;

  try {
    const channel = await Channel.findById(id);

    if (!channel || channel.owner.toString() !== userId) {
      console.log("Channel:", channel, "User ID:", userId);
      return res
        .status(403)
        .json({ message: "You are not authorized to update this channel" });
    }

    channel.channelName = name || channel.channelName;
    channel.description = description || channel.description;

    await channel.save();

    return res
      .status(200)
      .json({ message: "Channel updated successfully", channel });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating channel", error: err.message });
  }
};

export const deleteChannel = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const channel = await Channel.findById(id);
    if (!channel || channel.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this channel" });
    }

    await channel.remove();
    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting channel", error: err.message });
  }
};

export const getChannelVideos = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId).populate("videos");

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Respond with the populated videos
    res.status(200).json({
      message: "Videos fetched successfully",
      videos: channel.videos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching videos",
      error: error.message,
    });
  }
};
