import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxControl from './CheckboxControl.component';

const fieldName = 'isNonFuel';
const fieldId = '#isNonFuel';
describe('Checkbox Control component', () => {
    it('should render the component', () => {
        const wrapper = render(<CheckboxControl
            name={fieldName}
            id={fieldName}
            onChange={jest.fn()}
        />);
        expect(wrapper.container.querySelector(fieldId)).toBeInTheDocument();
    });

    it('should call onchange with correct data', async () => {
        const onChangeSpy = jest.fn();
        const wrapper = render(<CheckboxControl
            name={fieldName}
            id={fieldName}
            onChange={onChangeSpy}
        />);
        const inputElm = wrapper.container.querySelector(fieldId) as Element;
        await act(async () => {
            userEvent.click(inputElm);
        });
        expect(onChangeSpy).toBeCalledWith(fieldName, true);
    });
    it('it should work with checked', async () => {
        const onChangeSpy = jest.fn();
        const wrapper = render(<CheckboxControl
            name={fieldName}
            id={fieldName}
            required
            value={true}
            onChange={onChangeSpy}
        />);
        const inputElm = wrapper.container.querySelector(fieldId) as Element;
        await waitFor(() => {
            expect(wrapper.container.querySelector('.Mui-checked')).toBeInTheDocument();

        });
        await act(async () => {
            userEvent.click(inputElm);
        });
        expect(onChangeSpy).toBeCalledWith(fieldName, false);
    });
});
