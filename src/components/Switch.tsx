import React from "react";
import { cn } from "@/utils/cn";
import { check } from "prettier";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Toggle switch that binds to a checkbox input.
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, ...props }, ref) => {
    const [checkedState, setCheckedState] = React.useState(checked);

    return (
      <div className={cn("inline-block", className)}>
        <input
          type="checkbox"
          checked={checkedState}
          className={cn("peer hidden")}
          {...props}
        />
        <button
          onClick={() => setCheckedState(!checkedState)}
          className={cn(
            "rounded-md border border-neutral-400 p-1 text-xs tracking-[0.15em] text-neutral-600 transition-all dark:border-neutral-600",
            checkedState && "border-primary-500 dark:border-primary-500"
          )}
        >
          <div
            className={cn(
              "flex h-8 w-20 overflow-hidden rounded-sm transition-all",
              !checkedState && "bg-neutral-200 dark:bg-neutral-800",
              checkedState && "bg-primary-500/20"
            )}
          >
            <div
              className={cn(
                "flex w-40 items-center transition-all",
                !checkedState && "-translate-x-16"
              )}
            >
              <div className={cn("w-16 text-blue-500")}>ON</div>
              <div
                className={cn(
                  "h-8 w-4 rounded-sm transition-all",
                  !checkedState && "bg-neutral-300 dark:bg-neutral-600",
                  checkedState && "bg-primary-500"
                )}
              ></div>
              <div className={cn("w-16")}>OFF</div>
            </div>
          </div>
        </button>
      </div>
    );
  }
);
Switch.displayName = "Switch";
