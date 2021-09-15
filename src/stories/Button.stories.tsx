import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../components/UIComponents/Button/Button.component';
export default {
  title: 'Example/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} />;
}


export const Primary = Template.bind({});
Primary.args = {
  color: "primary",
  children: "Primary",
};