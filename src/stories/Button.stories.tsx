import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../components/UIComponents/Button/Button.component';
import { useTheme } from "../contexts/Theme/Theme.context";
export default {
  title: 'Example/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  const { theme } = useTheme();
  return <Button {...args} style={{ ...theme as React.CSSProperties }} />;
}


export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
  onClick: () => { },
  theme: 'USA',
  children: "Primary Button",
};
