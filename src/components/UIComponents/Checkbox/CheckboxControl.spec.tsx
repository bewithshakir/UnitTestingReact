import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxControl from './CheckboxControl.component';


describe('Checkbox Control component', () => {
    it('should render the component', () => {
        const wrapper = render(<CheckboxControl
            name='isNonFuel'
            id='isNonFuel'
            onChange={jest.fn()}
        />);
        expect(wrapper.container.querySelector('#isNonFuel')).toBeInTheDocument();
    });

    it('should call onchange with correct data', async () => {
        const onChangeSpy = jest.fn();
        const wrapper = render(<CheckboxControl
            name='isNonFuel'
            id='isNonFuel'
            onChange={onChangeSpy}
        />);
        const inputElm = wrapper.container.querySelector('#isNonFuel') as Element;
        await act(async () => {
            userEvent.click(inputElm);
        });
        expect(onChangeSpy).toBeCalledWith('isNonFuel', true);
    });
    it('it should work with checked', async () => {
        const onChangeSpy = jest.fn();
        const wrapper = render(<CheckboxControl
            name='isNonFuel'
            id='isNonFuel'
            required
            value={true}
            onChange={onChangeSpy}
        />);
        const inputElm = wrapper.container.querySelector('#isNonFuel') as Element;
        await waitFor(() => {
            expect(wrapper.container.querySelector('.Mui-checked')).toBeInTheDocument();

        });
        await act(async () => {
            userEvent.click(inputElm);
        });
        expect(onChangeSpy).toBeCalledWith('isNonFuel', false);
    });
});
