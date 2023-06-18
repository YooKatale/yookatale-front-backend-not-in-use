"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("tatli-app")
    ? JSON.parse(localStorage.getItem("tatli-app"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("tatli-app", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("tatli-app");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
