import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { log } from "src/log";
import { Button } from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    // backgroundColor: { control: "color" },
    children: { control: "text" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Button",
  onClick: () => log("YAAASS"),
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  children: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  children: "Button",
};
