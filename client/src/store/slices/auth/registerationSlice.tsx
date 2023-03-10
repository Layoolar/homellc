import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../apiActions";
import { AppDispatch } from "../../configureStore";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.success = false;
    },
    registrationRequested: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    registrationSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    registrationFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload.response.data.error;
    },
    removeError: (state) => {
      state.error = null ;
    }
  },
});

export const { setSuccess, registrationRequested, registrationSuccess, registrationFailed, removeError } = registrationSlice.actions;

export default registrationSlice.reducer;

export const register = (userData: any) => (dispatch: AppDispatch) => {
  dispatch(
    apiCallBegan({
      url:"/api/register",
      method: "post",
      data: userData,
      onStart: registrationRequested.type,
      onSuccess: registrationSuccess.type,
      onError: registrationFailed.type,
    })
  );
};
