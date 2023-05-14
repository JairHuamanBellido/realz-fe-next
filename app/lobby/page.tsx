import SectionChatRoom from "@/src/application/lobby/components/SectionChaatRooms";
import { cookies } from "next/headers";
import Head from "next/head";

export default function LobbyPage() {
  const cookieStore = cookies();
  const userType = cookieStore.get("user_type")?.value ?? "";
  const userId = cookieStore.get("user_id")?.value ?? "";

  return (
    <>
      <Head>
        <title>Realz | Lobby</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SectionChatRoom userId={userId} userType={userType} />
      </main>
    </>
  );
}
