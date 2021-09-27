import { ComponentMeta, ComponentStory } from '@storybook/react';
import  Input from '../components/UIComponents/Input/Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: { 
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Contact Name",
  onChange: e => e.target.value,
  value : onchange,
  width: 460,
  helperText: ''
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Contact Name",
  onChange: e => e.target.value,
  value : 'John Wick',
  disabled: true,
};

export const Error = Template.bind({});
Error.args = {
  label: "Contact Name",
  onChange: e => e.target.value,
  value : onchange,
  error: true,
  helperText: 'Message'
};

export const Required = Template.bind({});
Required.args = {
  label: "Contact Name",
  onChange: e => e.target.value,
  value : onchange,
  required: true,
  helperText: 'Message'
};

export const Custom = Template.bind({});
Custom.args = {
  label: "Contact Name",
  onChange: e => e.target.value,
  value : onchange,
  width: 260,
  multiline:true
};