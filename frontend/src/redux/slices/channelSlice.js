import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = "http://localhost:3000/api/channel";

// Thunks for async operations
// Create a new channel
export const createChannel = createAsyncThunk(
  "channel/createChannel",
  async ({ channelName, description, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_URL,
        { channelName, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.channel;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Get channel by user ID
export const getChannelById = createAsyncThunk(
  "channel/getChannelById",
  async (id, { rejectWithValue }) => {
    console.log("Fetching channel by user ID:", id);
    try {
      const response = await axios.get(`${API_URL}/user/${id}`);
      console.log("Channel fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching channel:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
// Get channel by channel ID

export const getChannelByChannelId = createAsyncThunk(
  "channel/getChannelByChannelId",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/channel/${channelId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Update channel details
export const updateChannel = createAsyncThunk(
  "channel/updateChannel",
  async ({ id, name, description, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.channel;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Delete a channel
export const deleteChannel = createAsyncThunk(
  "channel/deleteChannel",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Get videos from a channel
export const getChannelVideos = createAsyncThunk(
  "channel/getChannelVideos",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/videos/${channelId}`);

      return response.data.videos;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Initial state
const initialState = {
  channel: null,
  videos: [],
  videosLoaded: false,
  loading: false,
  error: null,
};

// Slice
const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    // Reset channel state to initial values
    resetChannelState: (state) => {
      state.channel = null;
      state.videos = [];
      state.videosLoaded = false;
      state.loading = false;
      state.error = null;
    },
    // Reset videos list
    resetVideos(state) {
      state.videos = [];
      state.videosLoaded = false; // Reset the flag
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Channel
      .addCase(createChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channel = action.payload;
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Channel by ID
      .addCase(getChannelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChannelById.fulfilled, (state, action) => {
        state.loading = false;
        state.channel = action.payload;
      })
      .addCase(getChannelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Channel
      .addCase(updateChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channel = action.payload;
      })
      .addCase(updateChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Channel
      .addCase(deleteChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channel = null;
      })
      .addCase(deleteChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Get Channel by Channel ID
      .addCase(getChannelByChannelId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChannelByChannelId.fulfilled, (state, action) => {
        state.loading = false;
        state.channel = action.payload;
      })
      .addCase(getChannelByChannelId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Get Channel videos
      .addCase(getChannelVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChannelVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
        state.videosLoaded = true; // Mark videos as loaded
      })
      .addCase(getChannelVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.videosLoaded = true;
      });
  },
});

export const { resetChannelState } = channelSlice.actions;

export default channelSlice.reducer;
