import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { log } from "src/log";
import { Textarea } from "./Textarea";

export default {
  title: "Example/Textarea",
  component: Textarea,
  argTypes: {
    // value: { control: "text" }, // not working, can this be live hooked up to onTextarea
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  placeholder: "Textarea placeholder",
  children: "Textarea label",
  value: "",
  onTextareaChange: () => log("YAAASS"),
};
