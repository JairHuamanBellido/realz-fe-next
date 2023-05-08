import { ChatRoomDomain } from "@/src/domain/chat-room/model/ChatRoomDomain.model";
import { selectMessagesStates } from "@/src/redux/reducer/MessagesReducer";
import { selectUserState } from "@/src/redux/reducer/UserReducer";
import clsx from "clsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

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
    <div className={clsx("h-calc-64px relative max-w-1440px mx-auto px-12")}>
      <div className="h-90% overflow-y-auto">
        {chatroom.messages.map((message) => (
          <div
            className="bg-white py-2 px-4 rounded-1  w-fit max-w-320px"
            key={message.id}
          >
            <p className="text-black">{message.text}</p>
          </div>
        ))}
        {latestMessages.map((message) => (
          <div
            key={message.id}
            className="bg-white py-2 px-4 rounded-1  w-fit max-w-320px"
          >
            <p className="text-black">{message.text}</p>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          className={clsx(
            "w-full bg-input-bg transition-all outline-none  border-input-borderColor border-solid border-1  ",
            "mb-8 text-base px-6 py-4 color-lightText ",
            "focus:outline-none focus:border-input-focusBorderColor focus:border-solid focus:border-1",
            "rounded",
            "font-satoshi"
          )}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
