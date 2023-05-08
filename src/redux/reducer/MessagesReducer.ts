import { MessagesDomain } from "@/src/domain/chat-room/model/MessageDomain.model";
import { MessagesState } from "../state/MessagesState";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

type AddMessagePayload = {
  message: MessagesDomain;
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState: { messages: [] as MessagesDomain[] },
  reducers: {
    addMessage(state: MessagesState, action: PayloadAction<AddMessagePayload>) {
      state.messages = [...state.messages, action.payload.message];
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export const selectMessagesStates = (state: AppState) => state.messages;
export default messagesSlice.reducer;
