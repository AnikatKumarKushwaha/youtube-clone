import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const response = await axios.get("http://localhost:3000/api/video");
  return response.data;
});

const videoSlice = createSlice({
  name: "videos",
  initialState: { video: [], isLoading: false, error: null },
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.video = action.payload;
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default videoSlice.reducer;
