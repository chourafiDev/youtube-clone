import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import videoServices from "./videoServices";

const initialState = {
  videos: [],
  video: {},
  recommends: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  isAdded: false,
  messageError: "",
  messageSuccess: "",
};

export const getVideos = createAsyncThunk(
  "video/getVideos",
  async (type, thunkAPI) => {
    try {
      let token = "";

      if (thunkAPI.getState().auth.user) {
        token = thunkAPI.getState().auth.user.token;
      }

      return await videoServices.getVideos(type, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadVideo = createAsyncThunk(
  "video/uploadVideo",
  async (videoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await videoServices.uploadVideo(videoData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const recommendationVideos = createAsyncThunk(
  "video/recommendationVideos",
  async (tags, thunkAPI) => {
    try {
      return await videoServices.recommendationVideos(tags);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getVideo = createAsyncThunk(
  "video/getVideo",
  async (id, thunkAPI) => {
    try {
      return await videoServices.getVideo(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addViews = createAsyncThunk(
  "video/addViews",
  async (id, thunkAPI) => {
    try {
      return await videoServices.addViews(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchVideo = createAsyncThunk(
  "video/searchVideo",
  async (query, thunkAPI) => {
    try {
      return await videoServices.searchVideo(query);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likeVideo = createAsyncThunk(
  "video/likeVideo",
  async (videoId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await videoServices.likeVideo(videoId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dislikeVideo = createAsyncThunk(
  "video/dislikeVideo",
  async (videoId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await videoServices.dislikeVideo(videoId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    reset: (state) => {
      state.videos = [];
      state.video = {};
      state.recommends = [];
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.isAdded = false;
      state.messageError = "";
      state.messageSuccess = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // All videos
      .addCase(getVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.videos = action.payload;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      })
      // Recommend videos
      .addCase(recommendationVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recommendationVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recommends = action.payload;
      })
      .addCase(recommendationVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      })
      // Get video
      .addCase(getVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.video = action.payload;
      })
      .addCase(getVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      })
      //  Add views
      .addCase(addViews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addViews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addViews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      })
      // Search videos
      .addCase(searchVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.videos = action.payload;
      })
      .addCase(searchVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      })
      // Upload video
      .addCase(uploadVideo.pending, (state) => {
        state.isLoading = true;
        state.isAdded = false;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAdded = true;
        state.messageSuccess = action.payload.message;
        state.videos.push(action.payload.video);
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isAdded = false;
        state.messageError = action.payload;
      })
      // Like video
      .addCase(likeVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        if (!state.video.likes.includes(action.payload.userId)) {
          state.video.likes.push(action.payload.userId);
          state.video.dislikes.splice(
            state.video.dislikes.findIndex(
              (userId) => userId === action.payload.userId
            ),
            1
          );
        }
      })
      .addCase(likeVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      }) // Dislike video
      .addCase(dislikeVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dislikeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        if (!state.video.dislikes.includes(action.payload.userId)) {
          state.video.dislikes.push(action.payload.userId);
          state.video.likes.splice(
            state.video.likes.findIndex(
              (userId) => userId === action.payload.userId
            ),
            1
          );
        }
      })
      .addCase(dislikeVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      });
  },
});

export const { reset } = videoSlice.actions;
export default videoSlice.reducer;
