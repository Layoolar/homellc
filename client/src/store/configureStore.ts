import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import reducer from "./rootReducer";
import logger from "./middleware/logger";
import api from "./middleware/api";
 
const persistConfig = {
  key: "root",
  storage,
};
 
const persistedReducer = persistReducer(persistConfig, reducer);
 
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger({ destination: "Logging" }), api),
});
 
export const persistor = persistStore(store);
 
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
 
export default store;