import { EnumUserAuthenticatedMethod } from "@/src/domain/user/enum/user-authenticated-method.enum";
import { getCookie } from "cookies-next";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";

type Data = {
  userTypeCookie: string;
};
export default function LobbyPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Realz | Lobby</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Lobby Page</h1>
        {data.userTypeCookie === EnumUserAuthenticatedMethod.GITHUB && (
          <button> Create chat room </button>
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  context: GetServerSidePropsContext
) => {
  const userTypeCookie = getCookie("user_type", {
    req: context.req,
    res: context.res,
  });
  return {
    props: {
      data: { userTypeCookie: userTypeCookie?.toString() ?? "" },
    },
  };
};
