import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { log } from "src/log";
import { Input } from "./Input";

export default {
  title: "Example/Input",
  component: Input,
  argTypes: {
    // value: { control: "text" }, // not working, can this be live hooked up to onInput
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  placeholder: "Input placeholder",
  children: "Input label",
  value: "",
  onInputChange: () => log("YAAASS"),
};
