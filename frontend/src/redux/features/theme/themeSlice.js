import { createSlice } from "@reduxjs/toolkit";

const darkModeLocal = localStorage.getItem("darkMode");

const initialState = {
  isDarkMode: darkModeLocal ? darkModeLocal : "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeDarkMode: (state) => {
      state.isDarkMode = state.isDarkMode === "dark" ? "light" : "dark";
    },
  },
});

export const { themeDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
