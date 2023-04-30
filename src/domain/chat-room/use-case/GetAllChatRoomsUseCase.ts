import { ChatRoomRepository } from "@/src/infrastructure/chat-room/repository/ChatRoomRepository";
import { inject, injectable } from "inversify";
import { ChatRoomDomain } from "../model/ChatRoomDomain.model";

@injectable()
export class GetAllChatRoomsUseCase {
  constructor(
    @inject(ChatRoomRepository)
    private readonly _chatRoomRepository: ChatRoomRepository
  ) {}

  async execute(): Promise<ChatRoomDomain[]> {
    return await this._chatRoomRepository.getAll();
  }
}
