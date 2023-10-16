import { forwardRef } from "react";
import { cn } from "@/utils/cn";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The label text.
   */
  children: React.ReactNode | string;
  /**
   * Classname string to apply to the <code>input</code> element.
   */
  showLabel?: boolean;
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
  /**
   * Whether the current input content is considered valid or not.
   */
  "aria-invalid"?: boolean;
}

/**
 * It's just an input.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, disabled, className, icon, ...props }, ref) => {
    return (
      <label
        className={cn(disabled && "cursor-not-allowed opacity-50", className)}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 top-0 flex w-10 items-center justify-center text-lg "
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
