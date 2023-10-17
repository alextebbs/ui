import type { Meta, StoryObj } from "@storybook/react";
import { HTMLInputTypeAttribute } from "react";

import { Input } from "@/components/Input";

import { BiSearch, BiStar } from "react-icons/bi";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Input",
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
    label: "Label",
    placeholder: "Search",
    className: "w-72",
    labelProps: {
      icon: <BiStar />,
    },
    "aria-invalid": false,
    icon: <BiSearch />,
  },
};
