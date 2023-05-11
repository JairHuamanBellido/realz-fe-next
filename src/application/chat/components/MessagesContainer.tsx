import { ChatRoomDomain } from "@/src/domain/chat-room/model/ChatRoomDomain.model";
import { selectMessagesStates } from "@/src/redux/reducer/MessagesReducer";
import { selectUserState } from "@/src/redux/reducer/UserReducer";
import Input from "@/src/shared/input";
import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import ChatCardMessage from "./CardMessage";

interface IProps {
  chatroom: ChatRoomDomain;
}
export default function MessagesContainer({ chatroom }: IProps) {
  const { sendJsonMessage } = useWebSocket(
    process.env.NEXT_PUBLIC_WS_URL || "",
    {}
  );

  const { messages: latestMessages } = useSelector(selectMessagesStates);

  const { id: user_id } = useSelector(selectUserState);
  const [message, setMessage] = useState<string>("");

  return (
    <div className={clsx("h-calc-64px")}>
      <div className="h-90% overflow-y-auto rounded-2 mb-4">
        {chatroom.messages.map((message) => (
          <ChatCardMessage message={message} key={message.id} />
        ))}
        {latestMessages.map((message) => (
          <ChatCardMessage message={message} key={message.id} />
        ))}
      </div>
      <div>
        <Input
          type="text"
          value={message}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          placeholder="Type a message"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              sendJsonMessage({
                action: "sendMessage",
                chatroom_id: chatroom.id,
                sender_id: user_id,
                text: message,
              });

              setMessage("");
            }
          }}
        />
      </div>
    </div>
  );
}
