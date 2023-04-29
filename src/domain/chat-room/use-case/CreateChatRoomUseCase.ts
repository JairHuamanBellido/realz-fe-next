import { inject, injectable } from "inversify";
import { ChatRoomDomain } from "../model/ChatRoomDomain.model";
import { ChatRoomRepository } from "@/src/infrastructure/chat-room/repository/ChatRoomRepository";
import { HttpCreateChatRoomDTO } from "@/src/infrastructure/chat-room/model/HttpCreateChatRoomDTO";

@injectable()
export class CreateChatRoomUseCase {
  constructor(
    @inject(ChatRoomRepository)
    private readonly _chatRoomRepository: ChatRoomRepository
  ) {}
  async execute(payload: HttpCreateChatRoomDTO): Promise<ChatRoomDomain> {
    return await this._chatRoomRepository.create(payload);
  }
}
