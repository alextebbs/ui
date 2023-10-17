import { forwardRef } from "react";
import { cn } from "@/utils/cn";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The label text.
   */
  children: React.ReactNode | string;
  /**
   * Is this labeling a disabled input?
   */
  disabled?: boolean;
  /**
   * Is this labeling a required input?
   */
  required?: boolean;
  /**
   * An icon (or any ReactNode) to show next to the label.
   */
  icon?: React.ReactNode;
}

/**
 * It's just an input.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, disabled, className, icon, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "flex",
          disabled && "cursor-not-allowed opacity-50",
          icon && "relative pl-5",
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "pointer-events-none absolute -top-0.5 bottom-0 left-0 flex w-5 items-center justify-center text-xs"
            )}
          >
            {icon}
          </div>
        )}
        <div className="text-xs uppercase tracking-[0.15em]">{children}</div>
      </label>
    );
  }
);
Label.displayName = "Label";
