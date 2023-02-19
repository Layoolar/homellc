import { configureStore } from "@reduxjs/toolkit";
import reducer from "./rootReducer";
import logger from "./middleware/logger";
import api from "./middleware/api";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
getDefaultMiddleware({
serializableCheck: {
// Ignore the AxiosError object in the payload
ignoredPaths: ["payload.response"],
},
}).concat(logger({ destination: "Logging" }), api),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

