import React from "react";
import { cn } from "@/utils/cn";
import { Label, type LabelProps } from "./Label";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
   * How wide the switch should be.
   */
  width?: string;
  /**
   * Whether to show or hide the "ON" and "OFF" labels.
   */
  showOnOff?: false;
}

/**
 * Toggle switch that binds to a <code>input[type='checkbox']</code>.
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      name,
      label,
      width = "80px",
      checked = false,
      showOnOff = true,
      showLabel = true,
      disabled = false,
      required = false,
      labelProps: { className: labelClassName, ...labelProps } = {},
      ...props
    },
    ref
  ) => {
    const isInvalid = props["aria-invalid"];

    const [checkedState, setCheckedState] = React.useState(checked);

    return (
      <div className={cn("inline-block", className)}>
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

        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checkedState}
          disabled={disabled}
          required={required}
          onChange={() => !disabled && setCheckedState(!checkedState)}
          className={cn("peer sr-only")}
          aria-invalid={isInvalid}
          {...props}
        />
        <div
          aria-hidden="true"
          onClick={() => !disabled && setCheckedState(!checkedState)}
          className={cn(
            "inline-block cursor-pointer rounded-md border border-neutral-400 p-1 text-center text-xs tracking-[0.15em] text-neutral-600 transition-all peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-1 peer-focus:ring-offset-neutral-50 dark:border-neutral-600 peer-focus:dark:ring-offset-neutral-950",
            checkedState && "border-primary-500 dark:border-primary-500",
            isInvalid && "border-error-500 dark:border-error-500",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <div
            className={cn(
              "flex h-8 overflow-hidden rounded-sm transition-all",
              !checkedState && "bg-neutral-200 dark:bg-neutral-800",
              checkedState && "bg-primary-500/20"
            )}
            style={{ width: width }}
          >
            <div
              className={cn("flex items-center transition-all")}
              style={{
                width: `calc(${width} * 2)`,
                transform: `translateX(${
                  !checkedState ? `calc(${width} * -0.7)` : `0`
                })`,
              }}
            >
              <div
                className={cn("text-primary-500")}
                style={{ width: `calc(${width} * 0.7)` }}
              >
                {showOnOff && "ON"}
              </div>
              <div
                className={cn(
                  "h-8 rounded-sm transition-all",
                  !checkedState && "bg-neutral-300 dark:bg-neutral-600",
                  checkedState && "bg-primary-500"
                )}
                style={{ width: `calc(${width} * 0.3)` }}
              ></div>
              <div style={{ width: `calc(${width} * 0.7)` }}>
                {showOnOff && "OFF"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
Switch.displayName = "Switch";
