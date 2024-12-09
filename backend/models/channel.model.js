import mongoose from "mongoose";
const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  subscribers: { type: Number, default: 0 },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }], //
});

export const Channel = mongoose.model("Channel", channelSchema);
