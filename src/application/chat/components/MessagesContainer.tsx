import { ChatRoomDomain } from "@/src/domain/chat-room/model/ChatRoomDomain.model";
import clsx from "clsx";

interface IProps {
  chatroom: ChatRoomDomain;
}
export default function MessagesContainer({ chatroom }: IProps) {
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
          placeholder="Type a message"
        />
      </div>
    </div>
  );
}
