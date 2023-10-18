import type { Meta, StoryObj } from "@storybook/react";

import { MultiSelect } from "@/components/MultiSelect";

import { DATA } from "./mock-data/countries";

const meta = {
  title: "MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Select countries",
    name: "countries",
    notFoundText: "No countries found",
    options: DATA,
    className: "w-full sm:w-96",
  },
};

export const Disabled: Story = {
  args: {
    label: "Select countries",
    name: "countries",
    notFoundText: "No countries found",
    options: DATA,
    className: "w-full sm:w-96",
    disabled: true,
  },
};
