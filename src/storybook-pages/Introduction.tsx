import { Input } from "@/components/Input";
import { MultiSelect } from "@/components/MultiSelect";
import { DATA } from "../stories/mock-data/stars";
import { Slider } from "@/components/Slider";
import { MultiSlider } from "@/components/MultiSlider";
import { Switch } from "@/components/Switch";
import { Button } from "@/components/Button";

interface IntroductionProps {}

/**
 * Small "chip" or "tag" component. Used in MultiSelect component.
 */
export const Introduction = (props: IntroductionProps) => {
  return (
    <div className="w-full max-w-[600px] pb-12 pt-12">
      <h2 className="mb-4 text-xl"># Storybook UI Exploration</h2>
      <p className="mb-4">
        This is a little project I&apos;m working on to experiment with creating
        reusable and accessible UI components in Storybook.
      </p>
      <p className="mb-4">
        You can click through the sidebar to view the different UI elements and
        their supported options. I&apos;ve composed some of them together here
        in this form as an example layout.
      </p>

      <div className="mt-24 rounded-md border border-neutral-400 dark:border-neutral-800">
        <div className="border-b border-neutral-400 px-4 py-4 dark:border-neutral-800 md:px-12">
          <h3 className="text-sm uppercase tracking-[0.15em]">
            Starship Launch Configuration
          </h3>
        </div>
        <div className="p-4 md:p-12">
          <div className="flex flex-col gap-8">
            <MultiSelect
              options={DATA}
              label="Target destinations"
              name={"country"}
            />
            <div className="flex w-full flex-col gap-8 md:flex-row">
              <Input
                className="flex-1"
                type="text"
                label="Name"
                placeholder="First and last name"
                required
              />
              <Input
                className="flex-1"
                type="password"
                label="Authorization Code"
                placeholder="Enter credentials"
                required
              />
            </div>
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
            <div className="flex w-full flex-row flex-wrap gap-8">
              <Switch label="Warp Drive" />
              <Switch label="Grav Drive" />
              <Switch checked label="Engines" />
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-400 px-4 py-4 dark:border-neutral-800 md:px-12">
          <div className="flex justify-end gap-8">
            <Button color="neutral" variant="ghost">
              Abort
            </Button>
            <Button>Authorize</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
