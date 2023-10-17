import React from "react";
import { cn } from "@/utils/cn";
import { Label, LabelProps } from "./Label";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Label for this input.
   */
  label: string;
  /**
   * Whether to visually show the label
   */
  showLabel?: boolean;
  /**
   * Props for the label
   */
  labelProps?: Omit<LabelProps, "children">;
}

/**
 * It's just an input.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      name,
      label,
      disabled = false,
      required = false,
      showLabel = true,
      labelProps: { className: labelClassName, ...labelProps } = {},
      ...props
    },
    ref
  ) => {
    const isInvalid = props["aria-invalid"];

    return (
      <div>
        <Label
          htmlFor={name}
          disabled={disabled}
          required={required}
          className={cn(
            "pb-1",
            !showLabel && "sr-only",
            isInvalid && "text-error-500",
            labelClassName
          )}
          aria-invalid={isInvalid}
          {...labelProps}
        >
          {label}
        </Label>
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
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
