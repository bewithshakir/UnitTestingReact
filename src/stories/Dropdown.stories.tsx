import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import  Input from '../components/UIComponents/Select/dropdown';

export default {
  title: 'Components/Dropdown',
  component: Input,
  argTypes: { 
  },
} as ComponentMeta<typeof Input>;


const Template: ComponentStory<typeof Input> = (args) => {
    return (<Input {...args} />);
};


export const Primary = Template.bind({});
Primary.args = {
  label: "Company Name",
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => event.target.value as string,
  value : 'Amazon',
  items: [
      {label:'Amazon', value:'Amazon'},
      {label:'Nike', value:'Nike'},
      {label:'Flipkart', value:'Flipkart'},
      {label:'Apple', value:'Apple'},
      {label:'Hp', value:'Hp'}
    ]  
};