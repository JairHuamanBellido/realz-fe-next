import { EnumUserAuthenticatedMethod } from "@/src/domain/user/enum/user-authenticated-method.enum";
import { setId } from "@/src/redux/reducer/UserReducer";
import ModalCreateChatRoom from "@/src/shared/modal/types/CreateChatRoomModal";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
        <h1>Lobby Page</h1>
        {data.userTypeCookie === EnumUserAuthenticatedMethod.GITHUB && (
          <button onClick={() => setIsOpen(true)}> Create chat room </button>
        )}
        <ModalCreateChatRoom
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
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
