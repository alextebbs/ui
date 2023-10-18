import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "@/components/Switch";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Switch",
  component: Switch,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    label: "Warp Drive",
    name: "switch",
    width: "100px",
  },
};
export const Disabled: Story = {
  args: {
    label: "Warp Drive",
    name: "switch",
    width: "100px",
    disabled: true,
  },
};
export const Invalid: Story = {
  args: {
    label: "Warp Drive",
    name: "switch",
    width: "100px",
    "aria-invalid": true,
  },
};
export const Custom_Width: Story = {
  args: {
    label: "Warp Drive",
    name: "switch",
    showLabel: false,
    width: "60px",
    showOnOff: false,
  },
};
