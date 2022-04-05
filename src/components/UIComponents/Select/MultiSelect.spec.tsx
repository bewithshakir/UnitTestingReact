import MultiSelect from './MultiSelect';
import { YellowFuelIcon } from '../../../assets/icons';
import { act, render } from '@testing-library/react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';


const l1 = { label: 'Label1', value: 'Value1', icon: <YellowFuelIcon /> };
const l2 = { label: 'Label2', value: 'Value2', icon: <YellowFuelIcon /> };
const l3 = { label: 'Label3', value: 'Value3', icon: <YellowFuelIcon /> };

describe('renders the MultiSelect component on change', () => {

    it('Should change value when onChange was called', async () => {
        const onChangeSpy = jest.fn();
        const props = {
            label: 'Select values',
            onChange: onChangeSpy,
            id: 'multi-select-on-change-test',
            items: [l1, l2, l3],
            name: 'multiTest'
        };
        const wrapper = render(<MultiSelect {...props} />);
        const select = wrapper.container.querySelector('#multi-select-on-change-test') as HTMLInputElement;

        await selectEvent.select(select, ['Label1']);
        expect(wrapper.container.querySelector('.option-label')).toBeInTheDocument();
        expect(onChangeSpy).toBeCalledWith('multiTest', [l1]);
    });
});

describe('renders the MultiSelect component with correct no of options', () => {
    it('Should render correct list of options', () => {
        const options = [l1, l2];
        const props = {
            label: 'Select values',
            onChange: jest.fn(),
            id: 'multi-select',
            items: options
        };
        const wrapper = render(<MultiSelect {...props} />);
        const indicator = wrapper.container.querySelector('div.multi-select__dropdown-indicator') as Element;
        userEvent.click(indicator);
        const foundOptions = wrapper.container.querySelectorAll('div.multi-select__option');
        expect(foundOptions.length).toEqual(options.length);
    });
});

describe('renders the MultiSelect component with more than 2 clicked options', () => {
    it('Should render correct option text in value', async () => {
        const options = [l1, l2, l3];
        const onChangeSpy = jest.fn();
        const props = {
            label: 'Select values',
            onChange: onChangeSpy,
            id: 'multi-select-checkbox',
            items: options
        };
        const wrapper = render(<MultiSelect {...props} />);
        const indicator = wrapper.container.querySelector('div.multi-select__dropdown-indicator') as Element;
        await act(async () => {
            userEvent.click(indicator);
        });
        const select = wrapper.container.querySelector('#multi-select-checkbox') as HTMLInputElement;
        await selectEvent.select(select, [l1.label, l2.label, l3.label]);
        expect(wrapper.getByText(`${l1.label}, ${l2.label} and 1 more`)).toBeInTheDocument();
    });
});

describe('renders the MultiSelect', () => {
    it('render with empty options and error', async () => {

        const props = {
            label: 'Select values',
            onChange: jest.fn(),
            id: 'multi-selectEmpty',
            items: [],
            required: true,
            error: true,
            helperText: 'Invalid',
            name: 'multiTest',
        };
        const wrapper = render(<MultiSelect {...props} />);
        const indicator = wrapper.container.querySelector('div.multi-select__dropdown-indicator') as Element;
        await act(async () => {
            userEvent.click(indicator);
        });

        const select = wrapper.container.querySelector('#multi-selectEmpty') as HTMLInputElement;
        await selectEvent.select(select, []);

        expect(wrapper.getByText('No Options found')).toBeInTheDocument();
    });
});
