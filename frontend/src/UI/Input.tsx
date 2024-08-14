import { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";

// Input component props
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// Input component
export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={classNames(
        "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-primary-500 sm:text-sm placeholder-gray-400",
        className
      )}
      // aria-invalid is set to false by default
      aria-invalid="false"
      // Spread the rest of the props
      {...props}
    />
  );
};
