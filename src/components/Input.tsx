import React, { type HTMLInputTypeAttribute } from "react";
import { cn } from "@/utils/cn";
import { Label, type LabelProps } from "./Label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
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
  /**
   * Disables the input.
   */
  disabled?: boolean;
  /**
   * Mark this input as required.
   */
  required?: boolean;
  /**
   * An icon (or any ReactNode) to show inside the input field.
   */
  icon?: React.ReactNode;
  /**
   * Classname string to apply to the <code>input</code> element.
   */
  className?: string;
  /**
   * Select the type of input to show.
   */
  type?: HTMLInputTypeAttribute;
  /**
   * Placeholder text to show when input is empty
   */
  placeholder?: string;
  /**
   * Whether the current input content is considered valid or not.
   */
  "aria-invalid"?: boolean;
}

/**
 * It's just an input (with a label).
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      className,
      icon,
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
      <div className={cn(className)}>
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

        <div className="relative dark:text-white">
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            required={disabled}
            name={name}
            id={name}
            className={cn(
              "peer w-full rounded-md border border-neutral-600 bg-transparent px-4 py-2 text-sm placeholder:text-neutral-400 focus-visible:outline-none dark:border-neutral-300 dark:placeholder:text-neutral-700",
              !isInvalid &&
                `focus-visible:border-primary-500 focus-visible:bg-primary-500/10 focus-visible:placeholder:text-primary-500/40 focus-visible:dark:border-primary-500 dark:focus-visible:placeholder:text-primary-500/40`,
              isInvalid &&
                `border-error-500 bg-error-500/10 placeholder:text-error-500/40 dark:border-error-500 dark:placeholder:text-error-500`,
              icon && `pl-9`,
              disabled && `cursor-not-allowed opacity-50`
            )}
            {...props}
          />
          {icon && (
            <div
              className={cn(
                "pointer-events-none absolute bottom-0 left-0 top-0 flex w-10 items-center justify-center text-lg text-neutral-500",
                !isInvalid && "peer-focus-visible:text-primary-500",
                isInvalid && "text-error-500",
                disabled && "text-neutral-500"
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";
