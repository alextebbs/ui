import type { Meta, StoryObj } from "@storybook/react";

import { TreeView } from "@/components/TreeView";

import { DATA } from "./mock-data/treeview";

const meta = {
  title: "Example/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...DATA,
  },
};
