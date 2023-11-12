import React from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Color for this button.
   */
  color?: "primary" | "secondary" | "neutral";
  /**
   * What style to use - ghost buttons are transparent, solid buttons have a
   * background color, and bordered buttons are transparent with a border.
   */
  variant?: "ghost" | "solid" | "bordered";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * The contents of the button.
   */
  children: string | React.ReactNode;
  /**
   * An icon (or any ReactNode) to show inside the button.
   */
  icon?: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * It's just a button.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color = "primary",
      size = "medium",
      variant = "solid",
      icon,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        type="button"
        ref={ref}
        className={cn(
          `flex appearance-none items-center rounded-sm uppercase tracking-[0.1em] transition duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 active:scale-95 focus-visible:dark:ring-offset-neutral-950`,
          variant == "solid" &&
            `bg-${color}-500 text-white hover:bg-${color}-600`,
          variant == "ghost" &&
            `bg-transparent text-${color}-500 hover:bg-${color}-500/10`,
          variant == "bordered" &&
            `border border-${color}-500 text-${color}-500 hover:bg-${color}-500/10`,
          variant == "bordered" && size == "large" && `border-2`,
          size == "small" && `px-4 py-2 text-xs`,
          size == "medium" && `px-4 py-2`,
          size == "large" && `rounded-md px-6 py-3 text-xl`,
          disabled && `cursor-not-allowed opacity-50`,
          className
        )}
        {...props}
      >
        {children}
        {icon && <span className="pl-2">{icon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";
