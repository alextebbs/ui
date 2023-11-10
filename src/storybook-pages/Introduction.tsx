import { Input } from "@/components/Input";
import { MultiSelect } from "@/components/MultiSelect";
import { DATA } from "../stories/mock-data/stars";
import { Slider } from "@/components/Slider";
import { MultiSlider } from "@/components/MultiSlider";
import { Switch } from "@/components/Switch";
import { Button } from "@/components/Button";
import { PiRocketLaunchDuotone } from "react-icons/pi";
import { AiOutlineCalendar, AiFillLock } from "react-icons/ai";
import { type FormEvent } from "react";

interface IntroductionProps {}

/**
 * Small "chip" or "tag" component. Used in MultiSelect component.
 */
export const Introduction = (props: IntroductionProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="w-full max-w-[600px] pb-12 pt-12">
      <h2 className="mb-4 text-xl"># Storybook UI Exploration</h2>
      <p className="mb-4">
        This is a space for me to experiment with creating reusable and
        accessible UI components in Storybook.
      </p>
      <p className="mb-4">
        You can click through the sidebar to view the different UI elements and
        their supported options. I&apos;ve composed some of them together here
        in this form as an example layout.
      </p>
      <p>
        Try navigating the form with your keyboard. The top toolbar can switch
        from light to dark theme.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-12 rounded-md border border-neutral-400 dark:border-neutral-800"
      >
        <div className="border-b border-neutral-400 px-4 py-4 dark:border-neutral-800 md:px-12">
          <h3 className="text-sm uppercase tracking-[0.15em]">
            Starship Launch Config
          </h3>
        </div>
        <div className="p-4 md:p-12">
          <div className="flex flex-col">
            <div className="pb-12">
              <MultiSelect
                options={DATA}
                label="Target destination(s)"
                name={"country"}
              />
              <div className="pt-2 text-xs text-neutral-500">
                This styled multi-select binds to a hidden select[multiple]
                element.
              </div>
            </div>
            <div className="pb-12">
              <div className="flex w-full flex-col gap-8 pb-6 md:flex-row">
                <Input
                  className="flex-1"
                  type="text"
                  label="Name"
                  placeholder="Enter name"
                  required
                />
                <Input
                  className="flex-1"
                  type="password"
                  label="Authorization Code"
                  icon={<AiFillLock />}
                  placeholder="Enter credentials"
                />
              </div>
              <div className="flex w-full flex-col gap-8 md:flex-row">
                <Input
                  className="flex-1"
                  type="number"
                  label="Est. Duration (YRS)"
                  placeholder="Enter years"
                  min={1}
                  required
                  aria-invalid
                />
                <Input
                  className="flex-1"
                  type="date"
                  label="Launch Date"
                  placeholder="Enter launch date"
                  icon={<AiOutlineCalendar />}
                  disabled
                />
              </div>
              <div className="pt-2 text-xs text-neutral-500">
                These input elements use standard HTML props like 'required',
                'disabled', and 'aria-invalid' to determine their style.
              </div>
            </div>
            <div className="pb-12">
              <div className="flex flex-col gap-8">
                <MultiSlider
                  label="Speed Range"
                  min={0}
                  max={100}
                  step={5}
                  minSelectableRange={20}
                  minInputProps={{ value: 20 }}
                  maxInputProps={{ value: 80 }}
                  leftRightContain={true}
                  format={(str) => `${str}AU/h`}
                />
                <Slider
                  label="Orbit dist."
                  min={0}
                  max={500}
                  step={50}
                  leftRightContain={true}
                  format={(str) => `${str}km`}
                />
              </div>
              <div className="pt-2 text-xs text-neutral-500">
                These styled sliders bind to hidden input[type='range']
                elements.
              </div>
            </div>
            <div className="pb-12">
              <div className="flex w-full flex-row flex-wrap gap-4 md:gap-6">
                <Switch label="Warp Drive" name="warp" />
                <Switch label="Grav Drive" name="grav" />
                <Switch checked label="Engines" name="engines" />
              </div>
              <div className="pt-2 text-xs text-neutral-500">
                These styled switches bind to hidden input[type='checkbox']
                elements.
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-400 px-4 py-4 dark:border-neutral-800 md:px-12">
          <div className="flex justify-end gap-8">
            <Button color="neutral" variant="ghost">
              Abort
            </Button>
            <Button type="submit" icon={<PiRocketLaunchDuotone />}>
              Authorize
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
