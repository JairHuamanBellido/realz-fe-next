import { MessagesDomain } from "@/src/domain/chat-room/model/MessageDomain.model";

export interface MessagesState {
  messages: MessagesDomain[];
}
