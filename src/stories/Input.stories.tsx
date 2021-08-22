import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from '../components/UIComponents/Input/Input';

export default {
  title: 'Example/Button',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta <typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;
