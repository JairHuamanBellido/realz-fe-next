import clsx from "clsx";
import useGetAllChatRooms from "../hooks/useGetAllChatRooms";
import Link from "next/link";
import Loader from "@/src/shared/loader";
import { useState } from "react";
import { EnumUserAuthenticatedMethod } from "@/src/domain/user/enum/user-authenticated-method.enum";
import ModalCreateChatRoom from "@/src/shared/modal/types/CreateChatRoomModal";
import Button from "@/src/shared/button";

interface Props {
  userType: string;
}
export default function SectionChatRoom({ userType }: Props) {
  const { data, isLoading, isSuccess } = useGetAllChatRooms();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <section className={clsx("px-16 max-w-1440px  mx-auto relative")}>
        <div className="flex items-center justify-between py-8">
          <h2 className={clsx("text-white text-2xl ")}>Welcome to the lobby</h2>
          {userType === EnumUserAuthenticatedMethod.GITHUB && (
            <div className="w-fit">
              <Button variant="secondary" onClick={() => setIsOpen(true)}>
                Create chat room
              </Button>
            </div>
          )}
        </div>
        <div className="flex  w-full flex-wrap gap-x-4 ">
          {isSuccess && (
            <div>
              <p className={clsx("mb-4 text-white")}>
                Currently:
                <span className="text-green"> {data.length} chatroom(s) </span>
              </p>
              {data.map((chatroom) => (
                <Link
                  key={chatroom.id}
                  className={clsx(
                    "text-base decoration-none bg-black  text-white",
                    "block p-4 w-fit rounded-1"
                  )}
                  href={`/chat/${chatroom.id}`}
                >
                  {chatroom.title}
                </Link>
              ))}
            </div>
          )}
          {isLoading && (
            <div className={clsx("w-36px h-36px relative")}>
              <Loader gap={6} />
            </div>
          )}
        </div>
      </section>
      <ModalCreateChatRoom
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}
