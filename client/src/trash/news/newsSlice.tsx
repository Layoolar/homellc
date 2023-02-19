import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../store/apiActions";
import { AppDispatch } from "../../store/configureStore";

const initialState = {
  newss: [],
  loading: false,
  isLoggedIn: localStorage.getItem("currentUser") && true,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    newsRequested: (state, action) => {
      state.loading = true;
    },
  },
});

export const { newsRequested } = newsSlice.actions;

export default newsSlice.reducer;
