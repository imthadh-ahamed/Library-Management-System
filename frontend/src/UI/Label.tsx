import { FC, LabelHTMLAttributes } from "react";
import classNames from "classnames";

// Label component props
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

// Label component
export const Label: FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label
      className={classNames(
        "block text-sm font-medium text-gray-700",
        className
      )}
      // Spread the rest of the props
      {...props}
    >
      {/* Render the children */}
      {children}
    </label>
  );
};
