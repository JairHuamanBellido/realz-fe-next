import { HTMLProps } from "react";
import { clsx } from "clsx";

type ButtonVariants = "primary" | "secondary";
interface Props extends HTMLProps<HTMLButtonElement> {
  variant: ButtonVariants;
  children: React.ReactNode;
}
export default function Button({
  variant,
  onClick,
  className,
  children,
}: Props) {
  const buttonStyleVariant = {
    primary: clsx("bg-button-primary-bg text-button-primary-text "),
    secondary: clsx("bg-button-secondary-bg text-button-secondary-text"),
  };
  return (
    <button
      className={clsx(
        "w-full px-8 py-4",
        "text-base font-satoshi font-600",
        "border-none rounded-2",
        "cursor-pointer",
        "transition-all",
        "active:scale-95",
        buttonStyleVariant[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
