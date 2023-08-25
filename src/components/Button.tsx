import React from "react";

import { cn } from "~/utils/cn";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * Is the button disabled?
   */
  disabled?: boolean;
  /**
   * What style to use - ghost buttons are transparent, solid buttons have a
   * background color, and bordered buttons are transparent with a border.
   */
  style?: "ghost" | "solid" | "bordered";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = (props: ButtonProps) => {
  const {
    primary = true,
    disabled = false,
    size = "medium",
    style = "solid",
    label,
  } = props;

  /**
   * Tailwind is sort of silly. Doing things this way does not work.
   *
   * const color = primary ? "blue-500" : "gray-500";
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
   * text-red-500 text-green-500
   *
   * This means that when this file is read by tailwind, it will determine that
   * it needs to include text-red-500 and text-green-500 in the compiled
   * package, even though those are just strings sitting in a comment.
   *
   * So instead, we do things like this:
   */

  const color = {
    border: primary
      ? "border-blue-500 hover:border-blue-600"
      : "border-gray-500 hover:border-gray-600",
    bg: primary
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-gray-500 hover:bg-gray-600",
    text: primary
      ? "text-blue-500 hover:text-blue-600"
      : "text-gray-500 hover:text-gray-600",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        `appearance-none rounded-sm transition duration-150 ease-in-out active:scale-95`,
        style == "solid" && `${color.bg} text-white`,
        style == "ghost" && `bg-transparent ${color.text}`,
        style == "bordered" && `border ${color.border} ${color.text}`,
        size == "small" && `px-2 py-1 text-xs`,
        size == "medium" && `px-4 py-1`,
        size == "large" && `px-6 py-2 text-xl`,
        disabled && `cursor-not-allowed opacity-50`
      )}
    >
      {label}
    </button>
  );
};
