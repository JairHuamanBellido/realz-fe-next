import SectionChatRoom from "@/src/application/lobby/components/SectionChaatRooms";
import { setId } from "@/src/redux/reducer/UserReducer";
import { getCookie } from "cookies-next";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Data = {
  userTypeCookie: string;
  userId: string;
};
export default function LobbyPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setId({ id: data.userId }));
  }, []);
  return (
    <>
      <Head>
        <title>Realz | Lobby</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SectionChatRoom userType={data.userTypeCookie} />
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
  const userId = getCookie("user_id", {
    req: context.req,
    res: context.res,
  });
  return {
    props: {
      data: {
        userTypeCookie: userTypeCookie?.toString() ?? "",
        userId: userId?.toString() ?? "",
      },
    },
  };
};
