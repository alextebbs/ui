import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "@/components/Slider";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Slider",
  component: Slider,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    label: "Volume",
    name: "volume",
    className: "min-w-[320px]",
    min: 0,
    max: 100,
    step: 1,
    value: 34,
    disabled: false,
    format: (value) => value.toString() + "%",
  },
};
