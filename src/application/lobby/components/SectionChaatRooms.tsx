import clsx from "clsx";
import useGetAllChatRooms from "../hooks/useGetAllChatRooms";
import Link from "next/link";
import Loader from "@/src/shared/loader";

export default function SectionChatRoom() {
  const { data, isLoading, isSuccess } = useGetAllChatRooms();

  return (
    <section className={clsx("px-16 max-w-1440px  mx-auto relative")}>
      <div>
        <h2 className={clsx("text-white text-2xl ", "mt-8 mb-4")}>Chatrooms</h2>
      </div>
      <div className="flex  w-full flex-wrap gap-x-4 ">
        {isSuccess &&
          data.map((chatroom) => (
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
        {isLoading && (
          <div className={clsx("w-36px h-36px relative")}>
            <Loader gap={6} />
          </div>
        )}
      </div>
    </section>
  );
}
