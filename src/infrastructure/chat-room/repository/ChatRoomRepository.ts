import { injectable } from "inversify";
import { HttpCreateChatRoomDTO } from "../model/HttpCreateChatRoomDTO";
import { ChatRoomDomain } from "@/src/domain/chat-room/model/ChatRoomDomain.model";
import { httpClient } from "@/src/core/http-client";

@injectable()
export class ChatRoomRepository {
  async create(payload: HttpCreateChatRoomDTO): Promise<ChatRoomDomain> {
    return (await httpClient.post("/chat-rooms", payload)).data;
  }

  async getAll(): Promise<ChatRoomDomain[]> {
    return (await httpClient.get<ChatRoomDomain[]>("/chat-rooms")).data;
  }
}
