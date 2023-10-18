import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "UI/Primitives/Button",
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: "Button",
    size: "medium",
  },
};
export const Small: Story = {
  args: {
    children: "button",
    size: "small",
  },
};
export const Large: Story = {
  args: {
    children: "Large Button",
    size: "large",
  },
};
export const Ghost: Story = {
  args: {
    children: "Small Button",
    variant: "ghost",
  },
};
export const Bordered: Story = {
  args: {
    children: "Bordered button",
    variant: "bordered",
  },
};
export const Secondary: Story = {
  args: {
    children: "Secondary button",
    color: "secondary",
  },
};
export const Secondary_Ghost: Story = {
  args: {
    children: "Secondary ghost button",
    color: "secondary",
    variant: "ghost",
  },
};
export const Secondary_Bordered: Story = {
  args: {
    children: "Secondary bordered button",
    color: "secondary",
    variant: "bordered",
  },
};

export const Neutral: Story = {
  args: {
    children: "Neutral button",
    color: "neutral",
  },
};
export const Neutral_Ghost: Story = {
  args: {
    children: "Neutral ghost button",
    color: "neutral",
    variant: "ghost",
  },
};
export const Neutral_Bordered: Story = {
  args: {
    children: "Neutral bordered button",
    color: "neutral",
    variant: "bordered",
  },
};
export const Custom_Class_Name: Story = {
  args: {
    children: "Custom button",
    color: "primary",
    className:
      "normal-case tracking-normal bg-purple-500 hover:bg-purple-600 rounded-full",
  },
};
