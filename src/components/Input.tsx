import React from "react";
import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

/**
 * It's just an input.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, type = "text", className, icon, ...props }, ref) => {
    return (
      <div className="relative dark:text-white">
        <input
          ref={ref}
          type={type}
          className={cn(
            "peer rounded-md border border-neutral-600 bg-transparent px-3 py-2 text-sm focus-visible:border-primary-500 focus-visible:bg-primary-500/10 focus-visible:outline-none focus-visible:placeholder:text-primary-500/40 dark:border-neutral-300 focus-visible:dark:border-primary-500",
            icon && `pl-9`,
            disabled && `cursor-not-allowed opacity-50`,
            className
          )}
          {...props}
        />
        {icon && (
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 flex w-10 items-center justify-center text-lg peer-focus-visible:text-primary-500">
            {icon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
