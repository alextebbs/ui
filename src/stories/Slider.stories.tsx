import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "@/components/Slider";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "UI/Slider",
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
    format: (value) => value.toString() + "%",
  },
};

// export const Disabled: Story = {
//   args: {
//     label: "Volume",
//     name: "volume",
//     className: "min-w-[320px]",
//     min: 0,
//     max: 100,
//     step: 1,
//     value: 34,
//     disabled: true,
//     format: (value) => value.toString() + "%",
//   },
// };

// export const Step_Prop: Story = {
//   args: {
//     label: "Set Price",
//     name: "price",
//     className: "min-w-[320px]",
//     min: 0,
//     max: 1000,
//     step: 20,
//     value: 500,
//     disabled: true,
//     format: (value) => value.toString() + "$",
//   },
// };
