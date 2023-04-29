import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../reducer/UserReducer";
import { createWrapper } from "next-redux-wrapper";
const makeStore = () =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppTunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
