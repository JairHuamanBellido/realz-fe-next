import useGetChatRoomById from "@/src/application/chat/hooks/useGetChatRoomById";
import ChatRoomLayout from "@/src/application/chat/layout/ChatRoomLayout";
import { DIContainer } from "@/src/core/di/di-container";
import { GetChatRoomByIdUseCase } from "@/src/domain/chat-room/use-case/GetChatRoomByIdUseCase";
import { setId } from "@/src/redux/reducer/UserReducer";
import Loader from "@/src/shared/loader";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import clsx from "clsx";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { getCookie } from "cookies-next";

interface Props {
  dehydratedState: DehydratedState;
  userId: string;
}
export default function ChatPage({ userId }: Props) {
  const { query } = useRouter();
  const { isSuccess, isLoading, data } = useGetChatRoomById(
    (query?.id as string) || ""
  );
  const dispatch = useDispatch();
  const { sendJsonMessage } = useWebSocket(
    process.env.NEXT_PUBLIC_WS_URL || "",
    {}
  );
  useEffect(() => {
    dispatch(setId({ id: userId }));

    sendJsonMessage({
      action: "joinChatRoom",
      chatroom_id: query.id,
      user_id: userId,
    });

    const cleanUp = () => {
      sendJsonMessage({
        action: "leaveChatRoom",
        chatroom_id: query.id,
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

  return (
    <>
      <Head>
        <title>Realz | Chat</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isLoading && (
          <div className={clsx("w-48px h-48px relative")}>
            <Loader gap={8} />
          </div>
        )}
        {isSuccess && <ChatRoomLayout chatRoom={data} />}
      </main>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const chatRoomId = (context.params?.id as string) ?? "";
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(
    [`chat-room-${chatRoomId}`],
    async () =>
      await DIContainer.resolve(GetChatRoomByIdUseCase).execute(chatRoomId)
  );
  const userId = getCookie("user_id", {
    req: context.req,
    res: context.res,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      userId: userId?.toString() ?? "",
    },
  };
}
