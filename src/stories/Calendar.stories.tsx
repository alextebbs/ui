import type { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "@/components/Calendar";

const meta = {
  title: "Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
