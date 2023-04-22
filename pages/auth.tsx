import useCreateGuestUser from "@/src/core/application/auth/hooks/useCreateGuestUser";
import { EnumUserAuthenticatedMethod } from "@/src/domain/user/enum/user-authenticated-method.enum";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

export default function AuthPage() {
  const [username, setUsername] = useState<string>("");

  const { mutate, isSuccess } = useCreateGuestUser();
  const { replace } = useRouter();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = uuidv4();

    mutate({
      id: id,
      email: id + "@example.com",
      authenticated_method: EnumUserAuthenticatedMethod.GUEST,
      name: username,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      replace("/lobby");
    }
  }, [isSuccess]);

  return (
    <>
      <Head>
        <title>Realz | Authentication</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Authentication</h1>
        <form onSubmit={onSubmit}>
          <input
            name="text"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => signIn("github")}>Sign in with Github</button>
      </main>
    </>
  );
}
