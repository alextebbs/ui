import React from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Color for this button.
   */
  primary?: "primary" | "secondary" | "neutral";
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
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    /**
     * Tailwind is sort of silly. Doing things this way does not work.
     *
     * className={`bg-${color}-500`}
     *
     * <button className={`text-${color} border-${color} bg-${color`}>
     *
     * Tailwind will not include classes like "text-blue-500" in the compiled
     * package, because it doesn't see that FULL string anywhere in the file.
     *
     * Instead, Tailwind literally needs you to have the full className string
     * ("text-blue-500") somewhere in the file, or it won't compile the package
     * to have that color. It doesn't matter where it is in file. It can even
     * be in a comment like this one:
     *
     * border-primary-500 hover:border-primary-600
     * border-secondary-500 hover:border-secondary-600
     * border-neutral-500 hover:border-neutral-600
     * bg-primary-500 hover:bg-primary-800
     * bg-secondary-500 hover:bg-secondary-800
     * bg-neutral-500 hover:bg-neutral-600
     * bg-secondary-500 hover:bg-secondary-600
     * text-primary-500 hover:text-primary-600
     * text-secondary-500 hover:text-secondary-600
     * text-neutral-500 hover:text-neutral-600
     * hover:bg-primary-500/10
     * hover:bg-secondary-500/10
     * hover:bg-neutral-500/10
     *
     * ...yeah.
     */

    return (
      <button
        type="button"
        ref={ref}
        className={cn(
          `appearance-none rounded-sm uppercase tracking-[0.1em] transition duration-150 ease-in-out active:scale-95`,
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
      </button>
    );
  }
);
Button.displayName = "Button";
