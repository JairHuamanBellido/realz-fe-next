import { DIContainer } from "@/src/core/di/di-container";
import { GetChatRoomByIdUseCase } from "@/src/domain/chat-room/use-case/GetChatRoomByIdUseCase";
import { useQuery } from "@tanstack/react-query";

export default function useGetChatRoomById(chatRoomId: string) {
  return useQuery([`chat-room-${chatRoomId}`], async () =>
    DIContainer.resolve(GetChatRoomByIdUseCase).execute(chatRoomId)
  );
}
