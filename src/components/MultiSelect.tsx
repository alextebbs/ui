import {
  type ChangeEvent,
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";

interface MultiSelectProps {
  /**
   * A list of strings that represent the options in the dropdown.
   */
  options: string[];
}

interface DropDownOption {
  value: string;
  isSelected: boolean;
  isDisabled: boolean;
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
 * Primary UI component for user interaction
 */
export const MultiSelect = (props: MultiSelectProps) => {
  const { options } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [dropDownOptions, setDropDownOptions] = useState<DropDownOption[]>(
    options.map((option) => ({
      value: option,
      isSelected: false,
      isDisabled: false,
    }))
  );

  const [inputValue, setInputValue] = useState<string>("");

  const [isDropdownHidden, setIsDropdownHidden] = useState<boolean>(true);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  /**
   *
   */
  const manageSelectedDropDownItems = (
    options: DropDownOption[],
    mode: "up" | "down" | undefined = undefined
  ) => {
    // get index of currently selected item
    const selectedIndex = options.findIndex((option) => option.isSelected);

    if (selectedIndex === -1) {
      let count = 0;

      const newDropDownOptions: DropDownOption[] = options.map(
        (option, i): DropDownOption => {
          count = option.isDisabled ? count + 1 : count;
          return { ...option, isSelected: i === count ? true : false };
        }
      );

      setDropDownOptions(newDropDownOptions);
    } else {
      let count = selectedIndex;

      // find index of next non-disabled item to select
      if (mode == "down") {
        while (count++ && options[count]?.isDisabled == true);
        if (count > options.length - 1) count = options.length - 1;
      } else {
        while (count-- && options[count]?.isDisabled == true);
        if (count < 0) count = selectedIndex;
      }

      const newDropDownOptions: DropDownOption[] = options.map(
        (option, i): DropDownOption => {
          return { ...option, isSelected: i === count ? true : false };
        }
      );

      setDropDownOptions(newDropDownOptions);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!isInputFocused) return;

    console.log(`key pressed: ${event.key}`);

    if (event.key === "Enter") {
      event.preventDefault();

      const selectedOption = dropDownOptions.find(
        (option) => option.isSelected
      );

      if (selectedOption) {
        handleAddOption(selectedOption.value);
        setIsDropdownHidden(true);
        setInputValue("");
      }
    }

    if (event.key === "Backspace") {
      if (inputValue === "" && selectedOptions.length > 0) {
        handleRemoveOption(selectedOptions[selectedOptions.length - 1]!);
      }
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      manageSelectedDropDownItems(dropDownOptions, "up");
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      manageSelectedDropDownItems(dropDownOptions, "down");
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
          value: option,
          isSelected: false,
          isDisabled: selectedOptions.includes(option),
        };
      })
      .filter((option) =>
        option.value.toUpperCase().includes(value.toUpperCase())
      );

    manageSelectedDropDownItems(newDropDownOptions);
  };

  const handleRemoveOption = (item: string) => {
    const newSelectedOptions = selectedOptions.filter((option) => {
      return option !== item;
    });

    setSelectedOptions(newSelectedOptions);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleAddOption = (item: string) => {
    setSelectedOptions([...selectedOptions, item]);

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const handleInputFocus = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDropdownHidden(false);
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
    <div className="relative w-[480px] text-sm uppercase text-white">
      <div
        className={`flex flex-wrap gap-1 border border-solid border-white p-1 ${
          !isDropdownHidden ? `rounded-tl-sm rounded-tr-sm` : `rounded-sm`
        }`}
      >
        {selectedOptions.map((item, idx) => (
          <button
            key={idx}
            className="cursor-delete flex appearance-none whitespace-nowrap rounded-sm border border-transparent bg-pink-500/20 p-1 px-2 uppercase text-pink-500 hover:border hover:border-red-500 hover:bg-red-500/20 hover:text-red-500"
            onClick={() => handleRemoveOption(item)}
          >
            <div className="whitespace-nowrap pr-1">{item}</div>
            &times;
          </button>
        ))}
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onFocus={(e) => handleInputFocus(e)}
          onBlur={(e) => handleInputBlur(e)}
          className="flex-grow appearance-none rounded-sm border-none bg-transparent p-1 px-3 uppercase text-white outline-none"
        />
      </div>
      <div
        className={`absolute left-0 right-0 top-full max-h-[320px] overflow-auto rounded-bl-sm rounded-br-sm border border-t-0 border-white pt-[1px] ${
          isDropdownHidden ? `hidden` : ``
        }`}
      >
        {dropDownOptions.length === 0 && (
          <div className="w-full cursor-not-allowed appearance-none p-2 px-4 text-left uppercase text-red-600">
            No Available Options
          </div>
        )}
        {dropDownOptions.map((item) => {
          return item.isDisabled ? (
            <div className="w-full cursor-not-allowed appearance-none p-2 px-4 text-left uppercase text-gray-600">
              {item.value}
            </div>
          ) : (
            <button
              // Don't fire blur when you mousedown here, or else the dropdown
              // will disappear before the click event fires.
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleAddOption(item.value)}
              className={`group relative w-full appearance-none p-2 px-4 text-left uppercase ${
                item.isSelected ? `bg-pink-500/20 text-pink-500` : ``
              }`}
            >
              <div
                className={`absolute -inset-[1px] z-10 border border-pink-500 ${
                  item.isSelected ? `block` : `hidden`
                }`}
              ></div>
              {getHighlightedText(item.value, inputValue)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
