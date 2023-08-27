import { type MouseEventHandler, useState } from "react";

interface ChipProps {
  /**
   * Label for this chip.
   */
  label: string;
  /**
   * A function to call when the remove button is clicked.
   */
  onRemove?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Small "chip" or "tag" component. Used in MultiSelect component.
 */
export const Chip = (props: ChipProps) => {
  const { label, onRemove } = props;

  const [removeHovered, setRemoveHovered] = useState(false);

  return (
    <div
      className={`flex rounded-sm border border-transparent bg-pink-500/20 text-sm uppercase text-pink-500 hover:border ${
        removeHovered ? `border-red-500 bg-red-500/20 text-red-500` : ``
      }`}
    >
      <div className={`p-1 pl-2 ${!onRemove && "pr-2"}`}>{label}</div>

      {onRemove && (
        <button
          className="p-1 px-2"
          onClick={onRemove}
          onMouseEnter={() => setRemoveHovered(true)}
          onMouseLeave={() => setRemoveHovered(false)}
        >
          &times;
        </button>
      )}
    </div>
  );
};
