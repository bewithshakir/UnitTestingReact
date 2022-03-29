

import { act, fireEvent, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { renderWithClient } from '../../../tests/utils';
import AddVehicleAsset from './addVehicleAsset';
jest.mock('react-router-dom', () => ({
    useNavigate: () => ({
        navigate: () => ({
            to: '/customer/*/parkingLots/viewLot/11111'
        })
    }),
    useParams: () => ({
        customerId: '123',
    })
}));


function getAllElements(component: RenderResult) {
    const vehicleTypeElm = component.container.querySelector('#vehicleType') as HTMLInputElement;
    const licenceNoElem = component.container.querySelector('#licenceNo') as HTMLInputElement;
    const vinElem = component.container.querySelector('#vin') as HTMLInputElement;
    const yearElem = component.container.querySelector('#year') as HTMLInputElement;
    const makeElm = component.container.querySelector('#make') as HTMLInputElement;
    const modelElm = component.container.querySelector('#model') as HTMLInputElement;
    const colorElm = component.container.querySelector('#color') as HTMLInputElement;
    const fuelProductNameElm = component.container.querySelector('#fuelProductName') as HTMLInputElement;
    const fuelCustomProductNameElm = component.container.querySelector('#fuelCustomProductName') as HTMLInputElement;

    const cancelBtn = component.container.querySelector('#cancel-btn') as HTMLButtonElement;
    const saveBtn = component.container.querySelector('#save-btn') as HTMLButtonElement;
    const formElem = component.container.querySelector('#saveVehicleForm') as HTMLFormElement;
    return { vehicleTypeElm, licenceNoElem, vinElem, yearElem, makeElm, modelElm, colorElm, fuelProductNameElm, fuelCustomProductNameElm, cancelBtn, saveBtn, formElem };
}


describe('Add Vehicle with success', () => {
    it('Should success when all fields are valid', async () => {
        const result = renderWithClient(<AddVehicleAsset
            disableAddEditButton={true}
            isHiddenAddEditRow={false}
            lotId={"11111"}
            customerId={"123"}
            reloadSibling={jest.fn()}
            selectedVehicleId={""}
        />);
        const {
            vehicleTypeElm, licenceNoElem, vinElem, yearElem, makeElm, modelElm, colorElm,
            fuelProductNameElm,
            fuelCustomProductNameElm,
            saveBtn
        } = getAllElements(result);

        await selectEvent.select(vehicleTypeElm, ['Medium']);

        await waitFor(() => {
            fireEvent.change(licenceNoElem, { target: { value: '123456C' } });
        });

        await waitFor(() => {
            fireEvent.change(vinElem, { target: { value: 'WD4PF1CD1KP147378' } });
        });

        await waitFor(() => {
            fireEvent.change(yearElem, { target: { value: '2013' } });
        });

        await waitFor(() => {
            fireEvent.change(makeElm, { target: { value: 'FORD' } });
        });

        await waitFor(() => {
            fireEvent.change(modelElm, { target: { value: 'TRANSIT' } });
        });

        await selectEvent.select(colorElm, ['Green']);

        await selectEvent.select(fuelProductNameElm, ['Diesel New']);
        await selectEvent.select(fuelCustomProductNameElm, ['1 Purple Product Retail']);

        await waitFor(() => {
            expect(saveBtn).toBeEnabled();
        });

        await act(async () => {
            userEvent.click(saveBtn);
        });

        await waitFor(async () => {
            expect(result.getByTestId('toaster-message')).toBeInTheDocument();
            expect(await result.findByText(/addSuccessMsg/)).toBeInTheDocument();
        });
    });
});
