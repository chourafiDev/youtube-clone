import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "./userServices";

const initialState = {
  user: {},
  isSuccess: false,
  isError: false,
  isLoading: false,
  isSub: false,
  isUnsub: false,
  messageError: "",
  messageSuccess: "",
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, thunkAPI) => {
    try {
      return await userServices.getUser(id);
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

export const subChannel = createAsyncThunk(
  "user/subChannel",
  async (channelId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // thunkAPI.getState().video.video.userId.subscribers++;

      return await userServices.subChannel(channelId, token);
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

export const unSubChannel = createAsyncThunk(
  "user/unSubChannel",
  async (channelId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // thunkAPI.getState().video.video.userId.subscribers--;

      return await userServices.unSubChannel(channelId, token);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.isSub = false;
      state.isUnsub = false;
      state.messageError = "";
      state.messageSuccess = "";
    },
  },
  extraReducers: (builder) => {
    builder // Get user
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      })
      // Sub channel
      .addCase(subChannel.pending, (state) => {
        state.isLoading = true;
        state.isSub = false;
      })
      .addCase(subChannel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.isSub = true;
        if (state.user.subscribedUsers.includes(action.payload.channel)) {
          state.user.subscribedUsers.splice(
            state.user.subscribedUsers.findIndex(
              (channelId) => channelId === action.payload.channel
            ),
            1
          );
        } else {
          state.user.subscribedUsers.push(action.payload.channel);
        }
      })
      .addCase(subChannel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSub = false;
        state.messageError = action.payload;
      })
      // unSub channel
      .addCase(unSubChannel.pending, (state) => {
        state.isLoading = true;
        state.isUnsub = false;
      })
      .addCase(unSubChannel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.isUnsub = true;
        if (state.user.subscribedUsers.includes(action.payload.channel)) {
          state.user.subscribedUsers.splice(
            state.user.subscribedUsers.findIndex(
              (channelId) => channelId === action.payload.channel
            ),
            1
          );
        } else {
          state.user.subscribedUsers.push(action.payload.channel);
        }
      })
      .addCase(unSubChannel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isUnsub = false;
        state.messageError = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
