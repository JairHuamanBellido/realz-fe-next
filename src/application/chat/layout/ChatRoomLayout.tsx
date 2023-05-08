import { ChatRoomDomain } from "@/src/domain/chat-room/model/ChatRoomDomain.model";
import ChatRoomHeader from "../components/Header";
import MessagesContainer from "../components/MessagesContainer";

interface IProps {
  chatRoom: ChatRoomDomain;
}
export default function ChatRoomLayout({ chatRoom }: IProps) {
  return (
    <div>
      <ChatRoomHeader title={chatRoom.title} />
      <MessagesContainer chatroom={chatRoom} />
    </div>
  );
}