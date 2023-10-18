import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "@/components/Textarea";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "UI/Primitives/Textarea",
  component: Textarea,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    label: "Textarea Label",
    name: "input",
    placeholder: "Type here",
    className: "w-72",
  },
};

export const Disabled: Story = {
  args: {
    label: "Textarea Label",
    name: "input",
    placeholder: "Type here",
    className: "w-72",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: "Textarea Label",
    name: "input",
    placeholder: "Type here",
    className: "w-72",
    "aria-invalid": true,
  },
};

export const Custom_Size_With_ClassName: Story = {
  args: {
    label: "Textarea Label",
    name: "input",
    placeholder: "Type here",
    className: "w-96 h-[120px]",
    "aria-invalid": true,
  },
};
