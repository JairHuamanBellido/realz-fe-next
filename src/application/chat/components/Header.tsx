import clsx from "clsx";

interface IProps {
  title: string;
}
export default function ChatRoomHeader({ title }: IProps) {
  return (
    <div className="px-12 py-4 h-64px w-full">
      <h2 className={clsx("text-white ")}>{title}</h2>
    </div>
  );
}
