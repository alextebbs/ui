import {
  type ChangeEvent,
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { cn } from "~/utils/cn";
import { Chip } from "./Chip";

interface MultiSelectProps {
  /**
   * A list of strings that represent the options in the dropdown.
   */
  options: DropDownOption[];
  /**
   * Name attribute for the <select multiple> element
   */
  name: string;
  /**
   * Is this multi-select disabled?
   */
  disabled?: boolean;
  /**
   * Text for label showing above multi-select.
   */
  label?: string;
  /**
   * Text for placeholder showing inside multi-select.
   */
  placeholder?: string;
  /**
   * Text for error message saying a search returned no results.
   */
  notFoundText?: string;
  /**
   * CSS width of the multi-select.
   */
  width?: string;
}

interface DropDownOption {
  value: string;
  label: string;
  isHighlighted?: boolean;
  isDisabled?: boolean;
}

const useKeyPress = (
  keys: string[],
  callback: (event: KeyboardEvent) => void,
  node: Element | null = null
) => {
  // implement the callback ref pattern
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // handle what happens on key press
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (keys.some((key) => event.key === key)) {
        callbackRef.current(event);
      }
    },
    [keys]
  ) as EventListener;

  useEffect(() => {
    // target is either the provided node or the document
    const targetNode = node ?? document;

    // attach the event listener
    targetNode && targetNode.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      targetNode && targetNode.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, node]);
};

/**
 * Multiple select dropdown.
 */
export const MultiSelect = (props: MultiSelectProps) => {
  const {
    options,
    label,
    name,
    disabled = false,
    placeholder = "Type to select options",
    notFoundText = "No results found",
    width = "480px",
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedOptions, setSelectedOptions] = useState<DropDownOption[]>([]);
  const [dropDownOptions, setDropDownOptions] = useState<DropDownOption[]>(
    options.map((option) => ({
      ...option,
      isSelected: false,
      isDisabled: false,
    }))
  );

  const [inputValue, setInputValue] = useState<string>("");

  const [isDropdownHidden, setIsDropdownHidden] = useState<boolean>(true);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const selectedOptionValues = selectedOptions.map((option) => option.value);

  /**
   *
   */
  const manageHighlightedDropDownOption = (
    options: DropDownOption[],
    mode: "next" | "prev" | undefined | number = undefined
  ) => {
    // get index of currently selected item

    let idxToSelect = 0;

    if (typeof mode != "number") {
      // find index of next non-disabled item to select

      const selectedIdx = options.findIndex((option) => option.isHighlighted);
      idxToSelect = selectedIdx;

      if (mode == "prev") {
        // find the prev non-disabled item relative to the currently selected item
        while (idxToSelect-- && options[idxToSelect]?.isDisabled == true);
        if (idxToSelect < 0) idxToSelect = selectedIdx;
      } else if (mode == "next") {
        // find the next non-disabled item relative to the currently selected item
        while (idxToSelect++ && options[idxToSelect]?.isDisabled == true);
        if (idxToSelect > options.length - 1) idxToSelect = options.length - 1;
      } else {
        // Find the first non-disabled item
        idxToSelect = 0;
        while (options[idxToSelect]?.isDisabled == true) idxToSelect++;
        if (idxToSelect > options.length - 1) idxToSelect = options.length - 1;
      }
    } else {
      idxToSelect = mode;
    }

    const newDropDownOptions: DropDownOption[] = options.map(
      (option, i): DropDownOption => {
        return {
          ...option,
          isHighlighted: i === idxToSelect ? true : false,
          isDisabled: selectedOptionValues.includes(option.value),
        };
      }
    );

    setDropDownOptions(newDropDownOptions);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!isInputFocused) return;

    if (event.key === "Enter") {
      event.preventDefault();

      const selectedOption = dropDownOptions.find(
        (option) => option.isHighlighted
      );

      if (selectedOption) {
        handleAddOption(selectedOption);
      }
    }

    if (event.key === "Backspace") {
      if (inputValue === "" && selectedOptions.length > 0) {
        handleRemoveOption(selectedOptions[selectedOptions.length - 1]!);
      }
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      manageHighlightedDropDownOption(dropDownOptions, "prev");
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      manageHighlightedDropDownOption(dropDownOptions, "next");
    }
  };

  useKeyPress(
    ["ArrowUp", "ArrowDown", "Enter", "Backspace"],
    handleKeyPress,
    inputRef.current
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputValue(value);

    if (value === "") {
      setIsDropdownHidden(true);
      return;
    }

    setIsDropdownHidden(false);

    const newDropDownOptions: DropDownOption[] = options
      .map((option): DropDownOption => {
        return {
          ...option,
          isDisabled: selectedOptionValues.includes(option.value),
        };
      })
      .filter((option) =>
        option.label.toUpperCase().includes(value.toUpperCase())
      );

    manageHighlightedDropDownOption(newDropDownOptions);
  };

  const handleRemoveOption = (optionToRemove: DropDownOption) => {
    const newSelectedOptions = selectedOptions.filter((option) => {
      return option.value !== optionToRemove.value;
    });

    setSelectedOptions(newSelectedOptions);

    manageHighlightedDropDownOption(dropDownOptions);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleAddOption = (optionToAdd: DropDownOption) => {
    setSelectedOptions([...selectedOptions, optionToAdd]);
    setIsDropdownHidden(true);
    setInputValue("");

    manageHighlightedDropDownOption(dropDownOptions);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputFocus = (event: ChangeEvent<HTMLInputElement>) => {
    setIsInputFocused(true);
  };

  const handleInputBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDropdownHidden(true);
    setIsInputFocused(false);
  };

  const getHighlightedText = (text: string, pattern: string) => {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${pattern})`, "gi"));

    return (
      <span>
        {parts.map((part, i) => (
          <span key={i}>
            {part.toLowerCase() === pattern.toLowerCase() ? (
              <mark className="bg-transparent text-inherit underline">
                {part}
              </mark>
            ) : (
              <>{part}</>
            )}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div
      style={{ width: width }}
      className={`${disabled && "cursor-not-allowed opacity-50"}`}
    >
      {label && (
        <label
          className={cn(
            `mb-2 block text-xs uppercase tracking-[0.15em] text-gray-300`,
            disabled && "cursor-not-allowed"
          )}
        >
          {label}
        </label>
      )}
      <div className="relative text-sm uppercase text-gray-300">
        <div
          className={cn(
            `flex flex-wrap gap-1 border border-solid border-gray-300 p-1`,
            !isDropdownHidden ? `rounded-tl-md rounded-tr-md` : `rounded-md`
          )}
        >
          {selectedOptions.map((item, i) => (
            <div key={i}>
              <Chip
                label={item.label}
                onRemove={() => handleRemoveOption(item)}
              />
            </div>
          ))}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => handleInputFocus(e)}
            onBlur={(e) => handleInputBlur(e)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              `flex-grow appearance-none rounded-sm border border-transparent bg-transparent p-1 px-3 uppercase text-white outline-none placeholder:text-gray-700`,
              disabled && `cursor-not-allowed`
            )}
          />
        </div>
        <div
          className={cn(
            `absolute left-0 right-0 top-full max-h-[320px] overflow-auto rounded-bl-md rounded-br-md border border-t-0 border-gray-300`,
            isDropdownHidden && `hidden`
          )}
        >
          {dropDownOptions.length === 0 && (
            <div className="w-full cursor-not-allowed appearance-none bg-red-500/10 p-2 px-4 uppercase text-red-600">
              {notFoundText}
            </div>
          )}
          {dropDownOptions.map((option, i) => {
            return option.isDisabled ? (
              <div
                key={i}
                className="w-full cursor-not-allowed appearance-none p-2 px-4 text-left uppercase text-gray-600"
              >
                {option.label}
              </div>
            ) : (
              <button
                // Don't fire blur when you mousedown here, or else the dropdown
                // will disappear before the click event fires.
                key={i}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleAddOption(option)}
                onMouseMove={() => {
                  manageHighlightedDropDownOption(dropDownOptions, i);
                }}
                className={cn(
                  `group relative w-full appearance-none p-2 px-4 text-left uppercase`,
                  option.isHighlighted && `bg-blue-500/20 text-blue-500`
                )}
              >
                <div
                  className={cn(
                    `absolute -inset-[1px] z-10 border border-blue-500`,
                    option.isHighlighted ? `block` : `hidden`
                  )}
                ></div>
                {getHighlightedText(option.label, inputValue)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="hidden">
        <select name={name} id={name} multiple disabled={disabled}>
          {options.map((option, i) => {
            const isSelected = selectedOptionValues.includes(option.value);

            return (
              <option key={i} value={option.value} selected={isSelected}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
