import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '../components/UIComponents/SearchInput/SearchInput';

export default {
    title: 'Components/SearchInput',
    component: Input,
    argTypes: {
    },
} as ComponentMeta<typeof Input>;


const Template: ComponentStory<typeof Input> = (args) => {
    return (<Input {...args} />);
};


export const Primary = Template.bind({});
Primary.args = {
    onChange: (event: React.ChangeEvent<{ value: unknown }>) => event.target.value as string,
    Placeholder: 'Search',
    name: 'SearchTerm'
};