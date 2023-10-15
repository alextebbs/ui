import React from "react";
import { cn } from "@/utils/cn";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * It's just an input.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ disabled, className, ...props }, ref) => {
    const isInvalid = props["aria-invalid"];

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          "min-h-48 peer rounded-md border border-neutral-600 bg-transparent px-4 py-3 text-sm  focus-visible:outline-none dark:text-white",
          disabled && `cursor-not-allowed opacity-50`,
          !isInvalid &&
            `focus-visible:border-primary-500 focus-visible:bg-primary-500/10 focus-visible:placeholder:text-primary-500/40 focus-visible:dark:border-primary-500`,
          isInvalid &&
            `border-error-500 bg-error-500/10 placeholder:text-error-500/40 dark:border-error-500`,
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
