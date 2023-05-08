import { ChatRoomRepository } from "@/src/infrastructure/chat-room/repository/ChatRoomRepository";
import { inject, injectable } from "inversify";
import { ChatRoomDomain } from "../model/ChatRoomDomain.model";

@injectable()
export class GetChatRoomByIdUseCase {
  constructor(
    @inject(ChatRoomRepository)
    private readonly _chatroomRepository: ChatRoomRepository
  ) {}

  async execute(id: string): Promise<ChatRoomDomain> {
    return await this._chatroomRepository.getById(id);
  }
}
