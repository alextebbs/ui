import { type InputHTMLAttributes, forwardRef, useState, useRef } from "react";
import { cn } from "@/utils/cn";
import { Label } from "@/components/Label";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * The current value of the item.
   */
  value?: number;
}

interface MultiSliderProps {
  /**
   * Label for the slider.
   */
  label?: string;
  /**
   * Whether to visually show the label
   */
  showLabel?: boolean;
  /**
   * A label for the minimum value <code>input[type='range']</code>. Only shown
   * to screen readers.
   */
  minLabel?: string;
  /**
   * A label for the minimum value <code>input[type='range']</code>. Only shown
   * to screen readers.
   */
  maxLabel?: string;
  /**
   * The minimum lower bound that can be selelected with the slider.
   */
  min: number;
  /**
   * The maximum upper bound that can be selelected with the slider.
   */
  max: number;

  /**
   * The minimum range that can be selected. If this is too small, the slider
   * thumbs may visually overlap.
   */
  minSelectableRange?: number;
  /**
   * How much to increment/decrement the slider value when sliding.
   */
  step?: number;
  /**
   * A function to format the value of the slider. Useful for adding $'s, %'s,
   * etc.
   */
  format?: (value: number) => string;
  /**
   * Whether to show the min and max values on the slider track.
   */
  showMinMaxRange?: boolean;
  /**
   * Whether to contain the slider to the exact left/right bounds of it's box,
   * or to allow it to overflow. This will automatically be set to true if the
   * max value is greater than 9999.
   */
  leftRightContain?: boolean;

  /**
   * Disables the slider.
   */
  disabled?: boolean;

  /**
   * Classname string to apply to the main wrapper element.
   */
  className?: string;

  /**
   * Other props to pass to the min <code>input[type="range"]</code>.
   */
  minInputProps?: InputProps;

  /**
   * Other props to pass to the max <code>input[type="range"]</code>.
   */
  maxInputProps?: InputProps;
}

export const MultiSliderThumb = forwardRef<
  HTMLDivElement,
  {
    value: number;
    percent: string;
    isFocused: boolean;
    isSliding: boolean;
    disabled: boolean;
    leftRightContain: boolean;
    format: (value: number) => string;
  }
>(
  (
    {
      value,
      percent,
      isFocused,
      isSliding,
      disabled,
      leftRightContain,
      format,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 cursor-pointer select-none",
          !leftRightContain && "-translate-x-1/2"
        )}
        style={{
          left: percent,
          transform: `translateX(-${
            leftRightContain ? percent : "50%"
          }) translateY(-50%)`,
        }}
      >
        <div
          className={cn(
            "rounded-md bg-primary-600 px-2 py-1 text-xs text-white transition-transform hover:scale-[115%]",
            disabled && "bg-neutral-500",
            isSliding && "scale-[115%] bg-primary-500",
            isFocused &&
              "scale-[115%] ring-2 ring-primary-500 ring-offset-1 ring-offset-neutral-50 dark:ring-offset-neutral-950"
          )}
        >
          {format(value)}
        </div>
      </div>
    );
  }
);

MultiSliderThumb.displayName = "MultiSliderThumb";

/**
 * UI element for setting min/max within a range that binds to two
 * <code>input[type="range"]</code>s.
 */
export const MultiSlider = forwardRef<HTMLFieldSetElement, MultiSliderProps>(
  (props, ref) => {
    const {
      label,
      showLabel = label,
      className,
      disabled,
      min,
      max,
      step = 1,
      format = (value) => value.toString(),
      showMinMaxRange = true,
      leftRightContain = max > 9999,
      minSelectableRange = step,
      minLabel = "Minimum Value",
      maxLabel = "Maximum Value",
      minInputProps: {
        value: defaultMinValue = min,
        name: minName = "max",
        ...minInputProps
      } = {},
      maxInputProps: {
        value: defaultMaxValue = max,
        name: maxName = "min",
        ...maxInputProps
      } = {},
    } = props;

    const [minValue, setMinValue] = useState(defaultMinValue);
    const [maxValue, setMaxValue] = useState(defaultMaxValue);

    const [slidingThumb, setSlidingThumb] = useState<"min" | "max" | null>(
      null
    );
    const [focusedThumb, setFocusedThumb] = useState<"min" | "max" | null>(
      null
    );

    const trackRef = useRef<HTMLDivElement>(null);
    const filledTrackRef = useRef<HTMLDivElement>(null);
    const minThumbRef = useRef<HTMLDivElement>(null);
    const maxThumbRef = useRef<HTMLDivElement>(null);

    const minPercent = ((minValue - min) / (max - min)) * 100 + "%";
    const maxPercent = ((maxValue - min) / (max - min)) * 100 + "%";

    const calcValue = (clientX: number, min: number, max: number) => {
      const trackRect =
        slidingThumb === "min"
          ? trackRef.current?.getBoundingClientRect()
          : trackRef.current?.getBoundingClientRect();
      if (!trackRect) return 0;

      let value = ((clientX - trackRect.left) / trackRect.width) * max;
      value = Math.min(Math.max(value, min), max);
      value = Math.round(value / step) * step;

      return value;
    };

    const determineClosestThumb = (clientX: number) => {
      const minThumbRect = minThumbRef.current?.getBoundingClientRect();
      const maxThumbRect = maxThumbRef.current?.getBoundingClientRect();

      if (!minThumbRect || !maxThumbRect) return null;

      const minDistance = Math.abs(
        clientX - minThumbRect.left - minThumbRect.width / 2
      );

      const maxDistance = Math.abs(
        clientX - maxThumbRect.left - maxThumbRect.width / 2
      );

      return minDistance < maxDistance ? "min" : "max";
    };

    const setValue = (clientX: number, thumb: "min" | "max" | null) => {
      if (thumb === "min") {
        setMinValue(calcValue(clientX, min, maxValue - minSelectableRange));
      } else {
        setMaxValue(calcValue(clientX, minValue + minSelectableRange, max));
      }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      const thumb = determineClosestThumb(e.clientX);
      setSlidingThumb(thumb);
      setValue(e.clientX, thumb);

      document.body.addEventListener("pointermove", handlePointerMoveBody);
      document.body.addEventListener("pointerup", handlePointerUpBody);
    };

    const handlePointerMoveBody = (
      e: React.PointerEvent<HTMLFieldSetElement> | PointerEvent
    ) => {
      if (slidingThumb) {
        setValue(e.clientX, slidingThumb);
      }
    };

    const handlePointerUpBody = () => {
      removeListeners();
    };

    const removeListeners = () => {
      document.body.removeEventListener("pointermove", handlePointerMoveBody);
      document.body.removeEventListener("pointerup", handlePointerUpBody);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      setSlidingThumb(determineClosestThumb(e.clientX));
    };

    const handlePointerLeave = () => {
      setSlidingThumb(null);
    };

    return (
      <fieldset ref={ref}>
        <div className="sr-only">
          <label htmlFor={minName}>{minLabel}</label>
          <input
            type="range"
            min={min}
            max={maxValue - minSelectableRange}
            value={minValue}
            name={minName}
            onChange={(e) => setMinValue(Number(e.target.value))}
            onFocus={() => setFocusedThumb("min")}
            onBlur={() => setFocusedThumb(null)}
            disabled={disabled}
            aria-label={minLabel}
            aria-valuenow={minValue}
            aria-valuemin={min}
            aria-valuemax={maxValue - minSelectableRange}
            {...minInputProps}
          />

          <label htmlFor={maxName}>{maxLabel}</label>
          <input
            type="range"
            min={minValue + minSelectableRange}
            max={max}
            name={maxName}
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            onFocus={() => setFocusedThumb("max")}
            onBlur={() => setFocusedThumb(null)}
            disabled={disabled}
            aria-label={maxLabel}
            aria-valuenow={maxValue}
            aria-valuemin={minValue + minSelectableRange}
            aria-valuemax={max}
            {...maxInputProps}
          />
        </div>

        <div
          className={cn(
            "group flex h-10 cursor-pointer flex-col items-center justify-start gap-2",
            className
          )}
          aria-hidden={true}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="relative top-[-2px] flex w-full items-center justify-between">
            {showMinMaxRange && (
              <div className="select-none text-xs tracking-[0.15em] text-slate-500">
                <div className={cn(!leftRightContain && "-translate-x-1/2")}>
                  {format(min)}
                </div>
              </div>
            )}
            <Label
              disabled={disabled}
              className={cn("absolute left-1/2 -translate-x-1/2")}
            >
              <legend>{label}</legend>
            </Label>
            {showMinMaxRange && (
              <div className="select-none text-xs tracking-[0.15em] text-slate-500">
                <div className={cn(!leftRightContain && "translate-x-1/2")}>
                  {format(max)}
                </div>
              </div>
            )}
          </div>

          <div
            className="relative flex h-2 w-72 rounded-md bg-neutral-300 dark:bg-neutral-600"
            ref={trackRef}
          >
            <div
              style={{
                width: `calc(${maxPercent} - ${minPercent})`,
                marginLeft: minPercent,
              }}
              ref={filledTrackRef}
              className={cn(
                "relative h-full rounded-md bg-primary-600",
                disabled && "bg-neutral-500"
              )}
            ></div>

            <MultiSliderThumb
              value={minValue}
              percent={minPercent}
              leftRightContain={leftRightContain}
              isSliding={slidingThumb === "min"}
              isFocused={focusedThumb === "min"}
              disabled={disabled ?? false}
              format={format}
              ref={minThumbRef}
            />

            <MultiSliderThumb
              value={maxValue}
              percent={maxPercent}
              leftRightContain={leftRightContain}
              isSliding={slidingThumb === "max"}
              isFocused={focusedThumb === "max"}
              disabled={disabled ?? false}
              format={format}
              ref={maxThumbRef}
            />
          </div>
        </div>
      </fieldset>
    );
  }
);

MultiSlider.displayName = "Slider";
