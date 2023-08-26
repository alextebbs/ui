import type { Meta, StoryObj } from "@storybook/react";

import { MultiSelect } from "~/components/MultiSelect";

import { DATA } from "./mockData/countries";

const meta = {
  title: "Example/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
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
  },
};
