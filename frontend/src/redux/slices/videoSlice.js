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
  async ({ videoid, userId, text }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${videoid}/comments`,
        { text, userId },
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

//like a comment
export const likeVideo = createAsyncThunk(
  "videos/likeVideo",
  async (videoId, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${videoId}/like`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//edit comments
export const editComment = createAsyncThunk(
  "videos/editComment",
  async ({ videoId, commentId, text }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${videoId}/comments/${commentId}`,
        { text },
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
//delete comments
export const deleteComment = createAsyncThunk(
  "videos/deleteComment",
  async ({ videoId, commentId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/${videoId}/comments/${commentId}`,
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
    builder.addCase(createVideo.fulfilled, (state) => {
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
    builder
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //like videos
      .addCase(likeVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentVideo = action.payload;
      })
      .addCase(likeVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    //edit comment
    builder.addCase(editComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editComment.fulfilled, (state, action) => {
      state.isLoading = false;

      const videoId = action.payload.video._id;
      const updatedComment = action.payload.video.comments.find(
        (comment) => comment._id === action.meta.arg.commentId
      );

      if (updatedComment && updatedComment.userId?.name) {
        // If the comment is found and userId is populated
        const index = state.comments[videoId]?.findIndex(
          (comment) => comment._id === updatedComment._id
        );

        if (index !== -1) {
          state.comments[videoId][index] = updatedComment;
        }
      } else {
        console.error("User data not populated correctly");
      }
    });
    builder.addCase(editComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete Comment
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      const videoId = action.payload.video._id;
      if (state.comments[videoId]) {
        state.comments[videoId] = state.comments[videoId].filter(
          (comment) => comment._id !== action.meta.arg.commentId
        );
      }
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default videoSlice.reducer;
