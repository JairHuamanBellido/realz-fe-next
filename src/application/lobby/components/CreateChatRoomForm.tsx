import { HttpCreateChatRoomDTO } from "@/src/infrastructure/chat-room/model/HttpCreateChatRoomDTO";
import { useForm } from "react-hook-form";
import useCreateChatRoom from "../hooks/useCreateChatRoom";
import { useSelector } from "react-redux";
import { selectUserState } from "@/src/redux/reducer/UserReducer";
import Button from "@/src/shared/button";
import Loader from "@/src/shared/loader";
import Input from "@/src/shared/input";
import { useRouter } from "next/navigation";

export default function CreateChatRoomForm() {
  const { register, handleSubmit } = useForm<HttpCreateChatRoomDTO>({});
  const { mutate, isLoading, isSuccess } = useCreateChatRoom();
  const { push } = useRouter();
  const { id: owner_id } = useSelector(selectUserState);
  const onSubmit = (request: HttpCreateChatRoomDTO) => {
    mutate(
      {
        title: request.title,
        owner_id: owner_id,
      },
      {
        onSuccess: (data) => {
          setTimeout(() => {
            push(`/lobby/chat/${data.id}`);
          }, 2000);
        },
      }
    );
  };

  return (
    <>
      {!isLoading && !isSuccess && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label htmlFor="title" className="text-white">
            Title
          </label>
          <Input {...register("title")} />
          <Button type="submit" variant="primary">
            Create Chat Room
          </Button>
        </form>
      )}

      {isLoading && (
        <div className="w-24px h-24px">
          <Loader gap={2} />
        </div>
      )}

      {isSuccess && (
        <div className="flex-col items-center justify-center">
          <p className="text-white">
            Chat Room created susccessfully. Redirect to chatroom...
          </p>
          <div className="w-24px mt-4 h-24px mx-auto relative">
            <Loader gap={2} />
          </div>
        </div>
      )}
    </>
  );
}
