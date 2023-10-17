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
   * props for the label
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
      <div>
        <Label
          htmlFor={name}
          disabled={disabled}
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
          {required && <sup className="text-error-500">*</sup>}
        </Label>

        <div className="relative dark:text-white">
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              "peer rounded-md border border-neutral-600 bg-transparent px-4 py-2 text-sm focus-visible:outline-none  dark:border-neutral-300 ",
              !isInvalid &&
                `focus-visible:border-primary-500 focus-visible:bg-primary-500/10 focus-visible:placeholder:text-primary-500/40 focus-visible:dark:border-primary-500`,
              isInvalid &&
                `border-error-500 bg-error-500/10 placeholder:text-error-500/40 dark:border-error-500`,
              icon && `pl-9`,
              disabled && `cursor-not-allowed opacity-50`,
              className
            )}
            {...props}
          />
          {icon && (
            <div
              className={cn(
                "pointer-events-none absolute bottom-0 left-0 top-0 flex w-10 items-center justify-center text-lg ",
                !isInvalid && "peer-focus-visible:text-primary-500",
                isInvalid && "text-error-500"
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
