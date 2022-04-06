

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


function getAllGeneralElements(component: RenderResult) {
    const isAssetElm = component.container.querySelector('#isAsset') as HTMLInputElement;
    const fuelProductNameElm = component.container.querySelector('#fuelProductName') as HTMLInputElement;
    const fuelCustomProductNameElm = component.container.querySelector('#fuelCustomProductName') as HTMLInputElement;
    const isNonFuelElm = component.container.querySelector('#isNonFuel') as HTMLInputElement;

    const cancelBtn = component.container.querySelector('#cancel-btn') as HTMLButtonElement;
    const saveBtn = component.container.querySelector('#save-btn') as HTMLButtonElement;
    const formElem = component.container.querySelector('#saveVehicleForm') as HTMLFormElement;
    return {
        isAssetElm,
        fuelProductNameElm, fuelCustomProductNameElm,
        cancelBtn, saveBtn, formElem,
        isNonFuelElm
    };
}

function getAllVehicleElements(component: RenderResult) {
    const vehicleTypeElm = component.container.querySelector('#vehicleType') as HTMLInputElement;
    const licenceNoElem = component.container.querySelector('#licenceNo') as HTMLInputElement;
    const vinElem = component.container.querySelector('#vin') as HTMLInputElement;
    const yearElem = component.container.querySelector('#year') as HTMLInputElement;
    const makeElm = component.container.querySelector('#make') as HTMLInputElement;
    const modelElm = component.container.querySelector('#model') as HTMLInputElement;
    const colorElm = component.container.querySelector('#color') as HTMLInputElement;
    return {
        vehicleTypeElm, licenceNoElem, vinElem, yearElem, makeElm,
        modelElm, colorElm,
    };
}

function getAllAssetElements(component: RenderResult) {
    const assetTypeElm = component.container.querySelector('#assetType') as HTMLInputElement;
    const assetIdElm = component.container.querySelector('#assetId') as HTMLInputElement;
    const assetNoteElm = component.container.querySelector('#assetNote') as HTMLInputElement;
    return {
        assetTypeElm, assetIdElm, assetNoteElm
    };
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
            fuelProductNameElm,
            fuelCustomProductNameElm,
            saveBtn
        } = getAllGeneralElements(result);
        const {
            vehicleTypeElm, licenceNoElem, vinElem, yearElem, makeElm, modelElm, colorElm
        } = getAllVehicleElements(result);

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

        await selectEvent.select(fuelProductNameElm, ['Diesel']);
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



describe('Add Asset with success', () => {
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
            isAssetElm,
            fuelProductNameElm,
            fuelCustomProductNameElm,
            saveBtn,
            isNonFuelElm,
        } = getAllGeneralElements(result);


        await act(async () => {
            userEvent.click(isAssetElm);
        });

        const {
            assetIdElm,
            assetNoteElm,
            assetTypeElm
        } = getAllAssetElements(result);

        await selectEvent.select(assetTypeElm, ['Gas Tank 2']);

        await waitFor(() => {
            fireEvent.change(assetIdElm, { target: { value: 'AF54HH' } });
            fireEvent.change(assetNoteElm, { target: { value: 'Red color tank' } });
        });

        await selectEvent.select(fuelProductNameElm, ['Diesel']);
        await selectEvent.select(fuelCustomProductNameElm, ['1 Purple Product Retail']);

        await act(async () => {
            userEvent.click(isNonFuelElm);
        });
        const nonFuelCustProductElm = result.container.querySelector('#nonFuelCustomProductName') as HTMLInputElement;

        await selectEvent.select(nonFuelCustProductElm, ['Test product 2 Retail']);


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
