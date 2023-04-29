import { DIContainer } from "@/src/core/di/di-container";
import { CreateChatRoomUseCase } from "@/src/domain/chat-room/use-case/CreateChatRoomUseCase";
import { HttpCreateChatRoomDTO } from "@/src/infrastructure/chat-room/model/HttpCreateChatRoomDTO";
import { useMutation } from "@tanstack/react-query";

export default function useCreateChatRoom() {
  const mutation = useMutation(
    async (payload: HttpCreateChatRoomDTO) =>
      await DIContainer.resolve(CreateChatRoomUseCase).execute(payload)
  );
  return mutation;
}
