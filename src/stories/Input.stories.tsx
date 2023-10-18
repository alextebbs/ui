import type { Meta, StoryObj } from "@storybook/react";
import { HTMLInputTypeAttribute } from "react";

import { Input } from "@/components/Input";

import { BiSearch, BiStar } from "react-icons/bi";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Primitives/Input",
  component: Input,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: {
      options: ["text", "password", "email", "number", "search", "tel", "url"],
      control: "select",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    type: "text",
    label: "Input Label",
    name: "input",
    placeholder: "Type here",
    className: "w-72",
  },
};

export const WithIcon: Story = {
  args: {
    type: "text",
    label: "Label",
    name: "input",
    showLabel: false,
    placeholder: "Search",
    className: "w-72",
    icon: <BiSearch />,
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    label: "Input Label",
    name: "input",
    placeholder: "Type here",
    className: "w-72",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    type: "text",
    label: "Input Label",
    name: "input",
    placeholder: "Type here",
    className: "w-72",
    "aria-invalid": true,
  },
};

export const CustomLabelProps: Story = {
  args: {
    type: "text",
    label: "Input Label",
    name: "input",
    placeholder: "Type here",
    className: "w-72",
    labelProps: {
      className: "text-purple-500",
      icon: <BiStar />,
    },
  },
};
