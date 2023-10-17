import { type InputHTMLAttributes, forwardRef, useState, useRef } from "react";
import { cn } from "@/utils/cn";
import { check } from "prettier";
import { Label } from "./Label";

interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label for the slider.
   */
  label: string;
  /**
   * Whether to visually show the label
   */
  showLabel?: boolean;
  /**
   * The minimum value of the slider.
   */
  min: number;
  /**
   * The minimum value of the slider.
   */
  max: number;
  /**
   * The current or default value of the slider.
   */
  value?: number;
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
}

/**
 * Slider UI that binds to a <code>input[type="range"]</code>.
 * Fully navigable with keyboard and accessible to screen readers.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      disabled,
      min,
      max,
      value: defaultValue = min,
      step = 1,
      label,
      showLabel = true,
      format = (value) => value.toString(),
      showMinMaxRange = true,
      leftRightContain = max > 9999,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue);
    const [isSliding, setIsSliding] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const trackRef = useRef<HTMLDivElement>(null);

    const percent = ((value - min) / (max - min)) * 100 + "%";

    const calcValue = (clientX: number) => {
      const trackRect = trackRef.current?.getBoundingClientRect();

      if (!trackRect) return 0;

      let value = ((clientX - trackRect.left) / trackRect.width) * max;
      value = Math.min(Math.max(value, min), max);
      value = Math.round(value / step) * step;

      return value;
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      setIsSliding(true);
      setValue(calcValue(e.clientX));
      document.body.addEventListener("pointermove", handlePointerMove);
      document.body.addEventListener("pointerup", handlePointerUp);
      return false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      setValue(calcValue(e.clientX));
    };

    const handlePointerUp = (e: PointerEvent) => {
      setIsSliding(false);
      document.body.removeEventListener("pointermove", handlePointerMove);
      document.body.removeEventListener("pointerup", handlePointerUp);
    };

    return (
      <div className={cn(className)}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          ref={ref}
          name={props?.name}
          id={props?.name}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          className="sr-only"
          onChange={(e) => setValue(Number(e.target.value))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          {...props}
        />

        <div
          className={cn(
            "group flex h-10 w-full cursor-pointer flex-col items-center justify-start gap-2",
            disabled && "pointer-events-none cursor-not-allowed opacity-50"
          )}
          onPointerDown={handlePointerDown}
          role="hidden"
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
              htmlFor={props?.name}
              disabled={disabled}
              className={cn(
                "absolute left-1/2 -translate-x-1/2",
                !showLabel && "sr-only"
              )}
            >
              {label}
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
            className="relative flex h-2 w-full rounded-md bg-neutral-300 dark:bg-neutral-600"
            ref={trackRef}
          >
            <div
              style={{ width: percent }}
              className={cn(
                "relative h-full rounded-md bg-primary-600",
                disabled && "bg-neutral-500"
              )}
            ></div>
            <div
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
                  "rounded-md bg-primary-500 px-2 py-1 text-xs text-white transition-transform group-hover:scale-[115%]",
                  disabled && "bg-neutral-500",
                  isSliding && "scale-[115%]",
                  isFocused &&
                    "scale-[115%] ring-2 ring-primary-500 ring-offset-1 ring-offset-neutral-50 dark:ring-offset-neutral-950"
                )}
              >
                {format(value)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";
