import ChatRoomLayout from "@/src/application/chat/layout/ChatRoomLayout";
import Head from "next/head";
import { cookies } from "next/headers";

export default function ChatPage({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const userId = cookieStore.get("user_id")?.value ?? "";

  return (
    <>
      <Head>
        <title>Realz | Chat</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ChatRoomLayout slug={params.slug} userId={userId} />
      </main>
    </>
  );
}
