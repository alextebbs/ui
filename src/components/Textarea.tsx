import React from "react";
import { cn } from "@/utils/cn";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * It's just an input.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ disabled, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          "min-h-48 peer rounded-md border border-neutral-600 bg-transparent px-4 py-3 text-sm focus-visible:border-primary-500 focus-visible:bg-primary-500/10 focus-visible:outline-none focus-visible:placeholder:text-primary-500/40 dark:border-neutral-300 dark:text-white focus-visible:dark:border-primary-500",
          disabled && `cursor-not-allowed opacity-50`,
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
