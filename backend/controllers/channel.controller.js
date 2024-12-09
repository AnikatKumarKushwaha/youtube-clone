import { Channel } from "../models/channel.model.js";

///////////handle the creation of a new channel////////////
export const createChannel = async (req, res) => {
  const { channelName, description } = req.body;

  // Extract `userId` from the authenticated user's data set by middleware
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

// Controller function to fetch a channel by its ID
export const getChannelByChannelId = async (req, res) => {
  const { channelId } = req.params;

  try {
    // populate videos to also fetch associated videos from reference
    const channel = await Channel.findById(channelId).populate("videos");

    // If no channel is found
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

// Controller function to fetch a channel by userId
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

// Controller function to update a channel by its ID
export const updateChannel = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user.userId;

  try {
    const channel = await Channel.findById(id);
    // Check if the channel exists and if the current user is the owner of the channel
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

// Controller function to delete a channel by its ID
export const deleteChannel = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const channel = await Channel.findById(id);
    // Check if the channel exists and if the logged-in user is the channel owner
    if (!channel || channel.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this channel" });
    }
    // Remove the channel from the database
    await channel.remove();
    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting channel", error: err.message });
  }
};

// Controller function to fetch all videos of a specific channel
export const getChannelVideos = async (req, res) => {
  const { channelId } = req.params;

  try {
    // Find the channel by its ID and populate its "videos" field
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
