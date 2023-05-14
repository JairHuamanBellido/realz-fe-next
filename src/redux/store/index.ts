import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../reducer/UserReducer";
import { createWrapper } from "next-redux-wrapper";
import { messagesSlice } from "../reducer/MessagesReducer";
export const store = () =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [messagesSlice.name]: messagesSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppTunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(store);
