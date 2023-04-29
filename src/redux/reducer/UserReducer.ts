import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../state/UserState";
import { AppState } from "../store";

type SetIdPayload = {
  id: string;
};
type UserReducers = {
  setId: (state: UserState, action: PayloadAction<SetIdPayload>) => void;
};

export const userSlice: Slice<UserState, UserReducers, "user"> = createSlice({
  name: "user",
  initialState: { id: "" },
  reducers: {
    setId: (state: UserState, action: PayloadAction<SetIdPayload>) => {
      state.id = action.payload.id;
    },
  },
});

export const { setId } = userSlice.actions;
export const selectUserState = (state: AppState) => state.user;
export default userSlice.reducer;
