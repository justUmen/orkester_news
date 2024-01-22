import { configureStore } from "@reduxjs/toolkit";
import usernameReducer from "./features/usernameSlice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: {
    usernameReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;