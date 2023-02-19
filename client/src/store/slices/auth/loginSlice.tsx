import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../apiActions";
import { AppDispatch } from "../../configureStore";
// import { PRE_URL } from "../../../utils/ENV/envs";
import {
  retrieveUserDetails,
  storeUserDetails,
} from "../../../utils/helperFunctions/userDataHandlers";

const initialState = {
  userData: "",
  loading: false,
  isLoggedIn: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequested: (state, action) => {
      state.loading = true;
      console.log("loginRequested", "looading");
    },

    loginReceived: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      console.log("loginReceived", action.payload);
      storeUserDetails(JSON.stringify(action.payload));
      state.userData = JSON.stringify(action.payload);
      localStorage.setItem("userDetails", JSON.stringify(action.payload)); // store in local storage
    },
    loginRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      
      console.log(state.error);
    },
  },
});

export const { loginRequested, loginReceived, loginRequestFailed } =
  loginSlice.actions;

export default loginSlice.reducer;

export const login = (loginDetails: any) => (dispatch: AppDispatch) => {
  console.log("loginDetails", loginDetails);
  dispatch(
    apiCallBegan({
      url:"api/login/",
      method: "post",
      data: loginDetails,
      onStart: loginRequested.type,
      onSuccess: loginReceived.type,
      onError: loginRequestFailed.type,
    })
  );
};

export const logout = () => (dispatch: AppDispatch, getState: any) => {
  if (getState().login.loading === true) return;

  dispatch(
    apiCallBegan({
      url: "/api/logout",
      method: "post",
      onStart: loginRequested.type,
      onSuccess: loginReceived.type,
      onError: loginRequestFailed.type,
    })
  );
};

export const checkLogin = () => async (dispatch: AppDispatch) => {
  const userDetails = await retrieveUserDetails();
  if (userDetails) {
    dispatch(loginReceived(JSON.parse(userDetails)));
  }
};

export const getUserDetails = () => async (dispatch: AppDispatch) => {
  const userDetails = await retrieveUserDetails();
  return userDetails;
};
