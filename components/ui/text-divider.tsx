import React from "react";
import { cn } from "@/lib/utils";

interface TextDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  lineClassName?: string;
}

export default function TextDivider({
  children,
  className,
  lineClassName,
  ...props
}: TextDividerProps) {
  return (
    <div
      className={cn("flex w-full items-center", className)}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    >
      <div
        className={cn("flex-grow border-t border-gray-300", lineClassName)}
      />
      <span className="mx-4 flex-shrink text-gray-600">{children}</span>
      <div
        className={cn("flex-grow border-t border-gray-300", lineClassName)}
      />
    </div>
  );
}
