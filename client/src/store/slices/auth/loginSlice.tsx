import { createSlice, ThunkAction } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../apiActions";
import { AppDispatch } from "../../configureStore";
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
    },
    loginReceived: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      storeUserDetails(JSON.stringify(action.payload));
      state.userData = JSON.stringify(action.payload);
      localStorage.setItem("userDetails", JSON.stringify(action.payload)); // store in local storage
    },
    loginRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      
    },
    onLogout: (state) => {
      state.isLoggedIn = false;
      state.userData = "";
      localStorage.clear();
      state.error = null;
    },
    removeError: (state) => {
      state.error = null ;
    }
  },
});

export const { loginRequested, loginReceived, loginRequestFailed, onLogout, removeError } =
  loginSlice.actions;

export default loginSlice.reducer;

export const login = (loginDetails: any) => (dispatch: AppDispatch) => {
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
