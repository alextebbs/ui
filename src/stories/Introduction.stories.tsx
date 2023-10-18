import type { Meta, StoryObj } from "@storybook/react";

import { Introduction } from "@/storybook-pages/Introduction";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Introduction",
  component: Introduction,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  // parameters: {
  //   options: { showPanel: false },
  // },
} satisfies Meta<typeof Introduction>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Intro: Story = {
  args: {},
};
