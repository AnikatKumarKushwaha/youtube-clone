import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/video"; // Base URL for the API

// Thunks for all routes

// Fetch all videos
export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
});

// Fetch a specific video by ID
export const fetchVideoById = createAsyncThunk(
  "videos/fetchVideoById",
  async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  }
);

// Create a new video
export const createVideo = createAsyncThunk(
  "videos/createVideo",
  async (videoData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, videoData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // Trigger fetching all videos to update the list
      dispatch(fetchVideos());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update a video
export const updateVideo = createAsyncThunk(
  "videos/updateVideo",
  async ({ id, videoData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, videoData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete a video
export const deleteVideo = createAsyncThunk(
  "videos/deleteVideo",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // Trigger fetching all videos to update the list
      dispatch(fetchVideos());
      return { id };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Add a comment to a video
export const addComment = createAsyncThunk(
  "videos/addComment",
  async ({ id, commentData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${id}/comments`,
        commentData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Fetch comments of a video
export const fetchComments = createAsyncThunk(
  "videos/fetchComments",
  async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}/comments`);
    return { id, comments: response.data };
  }
);

// Slice definition
const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    currentVideo: null,
    comments: {},
    isLoading: false,
    error: null,
    successMessage: null,
  },
  extraReducers: (builder) => {
    // Fetch all videos
    builder.addCase(fetchVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.videos = action.payload;
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Fetch video by ID
    builder.addCase(fetchVideoById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideoById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentVideo = action.payload;
    });
    builder.addCase(fetchVideoById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Create a video
    builder.addCase(createVideo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = "Video created successfully!";
    });
    builder.addCase(createVideo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || action.error.message;
    });

    // Update a video
    builder.addCase(updateVideo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedVideo = action.payload;
      const index = state.videos.findIndex(
        (video) => video._id === updatedVideo._id
      );
      if (index !== -1) {
        state.videos[index] = updatedVideo; // Update the specific video
      }
    });
    builder.addCase(updateVideo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || action.error.message;
    });

    // Delete a video
    builder.addCase(deleteVideo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteVideo.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteVideo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || action.error.message;
    });

    // Add a comment
    builder.addCase(addComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.isLoading = false;
      const videoId = action.payload.video._id;
      if (state.comments[videoId]) {
        state.comments[videoId].push(
          action.payload.video.comments.slice(-1)[0]
        );
      } else {
        state.comments[videoId] = [action.payload.video.comments.slice(-1)[0]];
      }
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || action.error.message;
    });

    // Fetch comments
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments[action.payload.id] = action.payload.comments;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default videoSlice.reducer;
