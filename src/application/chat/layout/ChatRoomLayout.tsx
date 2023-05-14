"use client";
import "reflect-metadata"
import { ChatRoomDomain } from "@/src/domain/chat-room/model/ChatRoomDomain.model";
import ChatRoomHeader from "../components/Header";
import MessagesContainer from "../components/MessagesContainer";
import { useDispatch } from "react-redux";
import useGetChatRoomById from "../hooks/useGetChatRoomById";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { useEffect } from "react";
import { setId } from "@/src/redux/reducer/UserReducer";
import clsx from "clsx";
import Loader from "@/src/shared/loader";
import { addMessage } from "@/src/redux/reducer/MessagesReducer";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  userId: string;
  slug: string;
}
export default function ChatRoomLayout({ userId, slug }: IProps) {
  const {
    isSuccess,
    isLoading,
    data: chatRoom,
  } = useGetChatRoomById(slug || "");
  const dispatch = useDispatch();
  const { sendJsonMessage, lastMessage } = useWebSocket(
    process.env.NEXT_PUBLIC_WS_URL || "",
    {}
  );

  useEffect(() => {
    if (!!lastMessage) {
      const messageJson = JSON.parse(lastMessage.data);

      if (messageJson.action === "SEND MESSAGE") {
        dispatch(
          addMessage({
            message: {
              id: uuidv4(),
              sender_id: messageJson.sender.id,
              text: messageJson.message,
            },
          })
        );
      }
    }
  }, [lastMessage]);
  useEffect(() => {
    dispatch(setId({ id: userId }));

    sendJsonMessage({
      action: "joinChatRoom",
      chatroom_id: slug,
      user_id: userId,
    });

    const cleanUp = () => {
      sendJsonMessage({
        action: "leaveChatRoom",
        chatroom_id: slug,
        user_id: userId,
      });
    };

    // Only work when user closing tab.
    // ⚠️ Tech Debt: Find a solution when user click on back button of browser
    window.addEventListener("unload", cleanUp);

    return () => {
      window.removeEventListener("unload", cleanUp);
    };
  }, []);

  if (isLoading) {
    return (
      <div className={clsx("w-48px h-48px relative")}>
        <Loader gap={8} />
      </div>
    );
  } else if (isSuccess) {
    return (
      <div className="relative w-full mx-auto px-12">
        <ChatRoomHeader title={chatRoom.title} />
        <MessagesContainer chatroom={chatRoom} />
      </div>
    );
  }
  return null;
}
