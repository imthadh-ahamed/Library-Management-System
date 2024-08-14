import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

// Button component props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

// Button component
export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={classNames(
        "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        className
      )}
      // aria-pressed is set to false by default
      aria-pressed="false"
      // Spread the rest of the props
      {...props}
    >
      {/* Render the children */}
      {children}
    </button>
  );
};

export const RedButton: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={classNames(
        "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        className
      )}
      // aria-pressed is set to false by default
      aria-pressed="false"
      // Spread the rest of the props
      {...props}
    >
      {/* Render the children */}
      {children}
    </button>
  );
};

export const BlueButton: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={classNames(
        "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        className
      )}
      // aria-pressed is set to false by default
      aria-pressed="false"
      // Spread the rest of the props
      {...props}
    >
      {/* Render the children */}
      {children}
    </button>
  );
};

export const GreenButton: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={classNames(
        "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        className
      )}
      // aria-pressed is set to false by default
      aria-pressed="false"
      // Spread the rest of the props
      {...props}
    >
      {/* Render the children */}
      {children}
    </button>
  );
};
