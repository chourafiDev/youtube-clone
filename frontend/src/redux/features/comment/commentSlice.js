import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
  comments: [],
  isSuccess: false,
  isAdded: false,
  isError: false,
  isLoading: false,
  messageError: "",
  messageSuccess: "",
};

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (videoId, thunkAPI) => {
    try {
      return await commentService.getComments(videoId);
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

export const addComment = createAsyncThunk(
  "comment/addComment",
  async (commentInfo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.addComment(commentInfo, token);
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

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.messageError = "";
      state.messageSuccess = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // All comments for a video
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      })
      // Add comment
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
        state.isAdded = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAdded = true;
        state.messageSuccess = action.payload.message;
        state.comments.push(action.payload.newComment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isAdded = false;
        state.isError = true;
        state.messageError = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
