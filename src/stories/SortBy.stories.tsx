import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SortbyMenu from '../components/UIComponents/Menu/SortbyMenu.component';
import { FormControl } from '@mui/material';
export default {
  title: 'Example/Menu',
  component: SortbyMenu,
} as ComponentMeta<typeof SortbyMenu>;

const Template: ComponentStory<typeof SortbyMenu> = (args) => {
  return <FormControl><SortbyMenu {...args} /></FormControl>;
}


export const Sortby = Template.bind({});
Sortby.args = {
  options: [
    "Payment completed",
    "Payment In Progress",
    "Recently Added Lots",
  ],
  menuName: "Sort By",
  onSelect: (value) => {
    alert(`Selected Value : ${value}`)
  }
};