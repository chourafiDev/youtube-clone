import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./features/videos/videoSlice";
import userReducer from "./features/user/userSlice";
import commentReducer from "./features/comment/commentSlice";
import themeReducer from "./features/theme/themeSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    user: userReducer,
    auth: authReducer,
    comment: commentReducer,
    theme: themeReducer,
  },
});
