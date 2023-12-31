import { type MouseEventHandler, useState } from "react";

interface ChipProps {
  /**
   * Contents of the Chip.
   */
  children: React.ReactNode | string;
  /**
   * A function to call when the remove button is clicked.
   */
  onRemove?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Small "chip" or "tag" component. Used in MultiSelect component.
 */
export const Chip = (props: ChipProps) => {
  const { onRemove, children } = props;

  const [removeHovered, setRemoveHovered] = useState(false);

  return (
    <div
      className={`flex rounded-sm border border-transparent bg-primary-500/20 text-sm uppercase text-primary-500 hover:border ${
        removeHovered ? `border-red-500 bg-red-500/20 text-red-500` : ``
      }`}
    >
      <div className={`p-1 pl-2 ${!onRemove && "pr-2"}`}>{children}</div>

      {onRemove && (
        <button
          className="p-1 px-2"
          onClick={onRemove}
          onPointerEnter={() => setRemoveHovered(true)}
          onPointerLeave={() => setRemoveHovered(false)}
        >
          &times;
        </button>
      )}
    </div>
  );
};
