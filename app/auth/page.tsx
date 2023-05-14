import Head from "next/head";
import AuthContainer from "@/src/application/auth/container/AuthContainer";

export default function AuthPage() {
  return (
    <>
      <Head>
        <title>Realz | Authentication</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-screen relative h-screen items-center justify-center ">
        <AuthContainer />
      </main>
    </>
  );
}
