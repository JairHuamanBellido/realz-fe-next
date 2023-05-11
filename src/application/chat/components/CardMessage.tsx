import { MessagesDomain } from "@/src/domain/chat-room/model/MessageDomain.model";

interface Props {
  message: MessagesDomain;
}
export default function ChatCardMessage({ message }: Props) {
  return (
    <div className=" py-2 rounded-1 flex-col">
      <p className=" color-gray">{message.sender_id} says: </p>
      <div className="h-full w-1px bg-white">
        </div>  
      <p className="text-blueBrilliant text-shadow-blue-brilliant text-base font-clashDisplay">{message.text}</p>
    </div>
  );
}
