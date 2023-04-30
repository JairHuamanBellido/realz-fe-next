import { DIContainer } from "@/src/core/di/di-container";
import { ChatRoomDomain } from "@/src/domain/chat-room/model/ChatRoomDomain.model";
import { GetAllChatRoomsUseCase } from "@/src/domain/chat-room/use-case/GetAllChatRoomsUseCase";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllChatRooms() {
  return useQuery<ChatRoomDomain[]>(
    ["getAllChatRooms"],
    async () => await DIContainer.resolve(GetAllChatRoomsUseCase).execute()
  );
}
