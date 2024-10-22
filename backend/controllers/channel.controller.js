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

export const getChannelById = async (req, res) => {
  const { id } = req.params;
  try {
    const channel = await Channel.findById(id).populate(videos);
    if (!channel) {
      return res
        .status(400)
        .json({ message: "You dont have a channel with this id" });
    }
    res.status(200).json(channel);
  } catch (err) {
    res
      .status(500)
      .json({ message: "error fetching channel", error: err.message });
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
