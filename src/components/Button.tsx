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
 * Just a simple button.
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
   * const color = primary ? "blue-500" : "neutral-500";
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
      ? "border-primary-500 hover:border-primary-600"
      : "border-neutral-500 hover:border-neutral-600",
    bg: primary
      ? "bg-primary-700 hover:bg-primary-800"
      : "bg-neutral-500 hover:bg-neutral-600",
    text: primary
      ? "text-primary-500 hover:text-primary-600"
      : "text-neutral-500 hover:text-neutral-600",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        `appearance-none rounded-sm uppercase tracking-[0.1em] transition duration-150 ease-in-out active:scale-95`,
        style == "solid" && `${color.bg} text-white`,
        style == "ghost" &&
          `bg-transparent ${color.text} hover:bg-primary-500/10`,
        style == "bordered" &&
          `border ${color.border} ${color.text} hover:bg-primary-500/10`,
        size == "small" && `px-2 py-2 text-xs`,
        size == "medium" && `px-4 py-2`,
        size == "large" && `px-6 py-3 text-xl`,
        disabled && `cursor-not-allowed opacity-50`
      )}
    >
      {label}
    </button>
  );
};
