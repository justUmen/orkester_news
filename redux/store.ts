import { configureStore } from "@reduxjs/toolkit";
import usernameReducer from "./features/usernameSlice";
import totalSearchReducer from "./features/totalSearchSlice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: {
    usernameReducer,
    totalSearchReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;