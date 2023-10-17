import type { Meta, StoryObj } from "@storybook/react";

import { MultiSlider } from "@/components/MultiSlider";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "UI/MultiSlider",
  component: MultiSlider,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof MultiSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    minSelectableRange: 15,
    // leftRightContain: true,
    step: 1,
    format: (value) => "$" + value.toString(),
    minInputProps: { value: 15 },
    maxInputProps: { value: 50 },
    label: "Price Range",
    maxLabel: "Maximum Price",
    minLabel: "Minimum Price",
  },
};
