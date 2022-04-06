import { act, cleanup, fireEvent, RenderResult, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { renderWithClient } from '../../../tests/utils';
import AddVehicleRule from "./index";

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => ({
        navigate: () => ({
            to: '/addVehicleRule'
        })
    }),
}));

function getAllElements(component: RenderResult) {
    const addLine1Ele = component.container.querySelector('#addLine1') as HTMLInputElement;
    const cityEle = component.container.querySelector('#city') as HTMLInputElement;
    const stateEle = component.container.querySelector('#state') as HTMLInputElement;
    const yearEle = component.container.querySelector('#year') as HTMLInputElement;
    const statusEle = component.container.querySelector('#status') as HTMLInputElement;
    const productEle = component.container.querySelector('#product') as HTMLInputElement;
    const saveBtn = component.container.querySelector('#saveBtn') as HTMLButtonElement;
    return { addLine1Ele, cityEle, stateEle, yearEle, statusEle, productEle, saveBtn };
}


afterEach(cleanup);

describe('Add vehicle Rule with success', () => {

    it('Add vehicle Rule snapshot testing overall', () => {
        const component = renderWithClient(<AddVehicleRule version="Breadcrumbs-Single" />);
        expect(component).toBeDefined();
    });
    it('Add vehicle Rule with success save btn', async () => {
        const result = renderWithClient(<AddVehicleRule version="Breadcrumbs-Single" />);
        const { addLine1Ele, cityEle, stateEle, yearEle, statusEle, productEle, saveBtn } = getAllElements(result);
        await selectEvent.select(statusEle, "Enabled");
        await act(async () => {
            fireEvent.change(addLine1Ele, { target: { value: 'ABC Auto Sales Inc,  Rixeyville Rd,' } });
        });
        await act(async () => {
            fireEvent.change(stateEle, { target: { value: 'VA' } });

        });
        await act(async () => {
            fireEvent.change(cityEle, { target: { value: 'Culpeper' } });

        });
        await act(async () => {
            fireEvent.change(yearEle, { target: { value: '2001' } });

        });

        await selectEvent.select(productEle, ["Regular"]);
        await waitFor(() => {
            expect(saveBtn).toBeEnabled();
        });
        await act(async () => {
            userEvent.click(saveBtn);
        });

        await waitFor(async () => {
            expect(result.getByTestId('toaster-message')).toBeInTheDocument();
            expect(await result.findByText(/Data added successfully/)).toBeInTheDocument();
        });


    });
});

describe('Add vehicle Rule with Error', () => {

    it('Add vehicle Rule with disable save button', async () => {

        const result = renderWithClient(<AddVehicleRule version="Breadcrumbs-Single" />);
        const { addLine1Ele, cityEle, stateEle, yearEle, productEle, saveBtn } = getAllElements(result);

        await act(async () => {
            fireEvent.change(addLine1Ele, { target: { value: 'ABC Auto' } });
        });
        await act(async () => {
            fireEvent.change(stateEle, { target: { value: 'VA' } });
        });
        await act(async () => {
            fireEvent.change(cityEle, { target: { value: 'Culpeper' } });
        });
        await act(async () => {
            fireEvent.change(yearEle, { target: { value: '2009' } });
        });
        await selectEvent.select(productEle, ["Diesel"]);

        await waitFor(async () => {
            expect(saveBtn).toBeDisabled();
        });
    });
});
