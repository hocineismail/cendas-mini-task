import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import tasksSlice from "./reducers/tasksSlice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    tasks: tasksSlice,

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;