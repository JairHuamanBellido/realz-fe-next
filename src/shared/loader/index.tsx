import { clsx } from "clsx";

interface IProps {
  gap: number;
}
export default function Loader({ gap }: IProps) {
  return (
    <div
      style={{ gap: gap + "px" }}
      className={clsx("w-full h-full relative loader-container")}
    >
      <div className={clsx("w-full h-full ", "loader-1", "bg-teal")}></div>
      <div className={clsx("w-full h-full ", "loader-2", "bg-teal")}></div>
      <div className={clsx("w-full h-full ", "loader-4", "bg-teal")}></div>
      <div className={clsx("w-full h-full ", "loader-3", "bg-teal")}></div>
    </div>
  );
}
