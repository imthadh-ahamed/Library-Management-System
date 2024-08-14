import React, { HTMLProps } from "react";
import { cn } from "../lib/utils";

// Define a type for the common props of all table components
interface TableProps extends HTMLProps<HTMLTableElement> {
  className?: string;
  children?: React.ReactNode;
}

export function Table({ className, children, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn("w-full divide-y divide-gray-300", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

// Define a type for the TableHeader props
interface TableHeaderProps extends HTMLProps<HTMLTableSectionElement> {
  className?: string;
  children?: React.ReactNode;
}

export function TableHeader({ className, children, ...props }: TableHeaderProps) {
  return (
    <thead className={cn("bg-gray-50", className)} {...props}>
      {children}
    </thead>
  );
}

// Define a type for the TableRow props
export function TableRow({ className, children, ...props }: HTMLProps<HTMLTableRowElement>) {
  return (
    <tr className={cn("bg-white", className)} {...props}>
      {children}
    </tr>
  );
}

// Define a type for the TableHead props
export function TableHead({ className, children, ...props }: HTMLProps<HTMLTableHeaderCellElement>) {
  return (
    <th
      className={cn(
        "px-6 py-3 text-left text-sm bg-gray-200 font-medium text-black uppercase tracking-wider",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

// Define a type for the TableBody props
export function TableBody({ className, children, ...props }: HTMLProps<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn("bg-white divide-y divide-gray-300", className)}
      {...props}
    >
      {children}
    </tbody>
  );
}

// Define a type for the TableCell props
interface TableCellProps extends HTMLProps<HTMLTableDataCellElement> {
  className?: string;
  children?: React.ReactNode;
}

export function TableCell({ className, children, ...props }: TableCellProps) {
  return (
    <td
      className={cn(
        "px-6 py-4 whitespace-nowrap text-sm text-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}
