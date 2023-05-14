import clsx from "clsx";
import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLInputElement> {}

export default function Input(props: Props) {
  return (
    <input
      className={clsx(
        "transparent-low-2 color-white",
        "border-input-borderColor border-solid border-1",
        "w-full transition-all outline-none",
        "mb-8 text-base px-6 py-4 ",
        "focus:outline-none focus:border-input-focusBorderColor focus:border-solid focus:border-1",
        "rounded",
        "font-satoshi"
      )}
      {...props}
    />
  );
}
