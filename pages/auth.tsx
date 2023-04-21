import { signIn } from "next-auth/react";
import Head from "next/head";

export default function AuthPage() {
  return (
    <>
      <Head>
        <title>Realz | Authentication</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Authentication</h1>

        <button onClick={() => signIn("github")}>Sign in with Github</button>
      </main>
    </>
  );
}
