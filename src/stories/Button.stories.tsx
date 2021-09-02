import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../components/UIComponents/Button/Button.component';
export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} />;
}


export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
  onClick: () => { },
  theme: 'USA',
  children: "Primary Button",
};
