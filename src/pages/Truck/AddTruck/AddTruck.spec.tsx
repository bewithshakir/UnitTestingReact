import { waitFor, render, cleanup, act, getByLabelText } from "@testing-library/react";
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import { rest } from "msw";
import routeDataDom from 'react-router-dom';

import { renderWithClient } from '../../../tests/utils';
import AddTruck from './index';
import { serverMsw } from "../../../setupTests";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => mockedNavigate,
    useLocation: () => ({
        location: {
            pathname: '/truckParkingLot/addTruck'
        },
        push: jest.fn()
    })
}));


function getAllElements (component: any) {
    const truckNameElem = component.container.querySelector('#truckName');
    const licenseElem = component.container.querySelector('#license');
    const vinElem = component.container.querySelector('#vin');
    const makeModelElem = component.container.querySelector('#makeModel');
    const colorNm = component.container.querySelector('#color') as HTMLInputElement;
    const yearElem = component.container.querySelector('#year');
    const statusElem = component.container.querySelector('#status') as HTMLInputElement;
    const truckParkingLotElem = component.container.querySelector('#truckParkingLot') as HTMLInputElement;
    const opexFuelTypeElem = component.container.querySelector('#opexFuelType') as HTMLInputElement;
    const saveBtn = component.container.querySelector('#saveBtn');
    const cancelBtn = component.container.querySelector('#cancelBtn');
    const formElem = component.container.querySelector('#addTruckForm');

    return { formElem, truckNameElem, licenseElem, vinElem, makeModelElem, colorNm, yearElem, statusElem, truckParkingLotElem, opexFuelTypeElem, saveBtn, cancelBtn };
}

afterEach(cleanup);

describe('AddTruck component', () => {

    describe('add/edit truck screen render with common functionality', () => {

        it('renders the add truck colors with data', async () => {
            const result = renderWithClient(<AddTruck version="Breadcrumbs-Single" />);
            const { formElem, colorNm } = getAllElements(result);
            expect(formElem).toHaveFormValues({ color: '' });
        });


        it('renders the add truck fuel with data', async () => {
            const result = renderWithClient(<AddTruck version="Breadcrumbs-Single" />);
            const { formElem, opexFuelTypeElem } = getAllElements(result);
            expect(formElem).toHaveFormValues({ status: '' });
        });

        it('renders the disabled save button', async () => {
            const result = renderWithClient(<AddTruck version="Breadcrumbs-Single" />);
            const { saveBtn } = getAllElements(result);
            expect(saveBtn).toBeDisabled();
        });

        it('renders the enabled save button', async () => {
            const result = renderWithClient(<AddTruck version="Breadcrumbs-Single" />);
            const { saveBtn } = getAllElements(result);
            saveBtn.removeAttribute('disabled');
            expect(saveBtn).toBeEnabled();
        });
    });


    describe('add truck screen render', () => {
        it('show toaster with success message on submit form', async () => {
            const result = renderWithClient(<AddTruck version="Breadcrumbs-Single" />);
            await act(async () => {
                const { truckNameElem, licenseElem, vinElem, makeModelElem, colorNm, yearElem, statusElem, truckParkingLotElem, opexFuelTypeElem, saveBtn } = getAllElements(result);

                userEvent.type(truckNameElem, 'Truck1');
                userEvent.type(licenseElem, '123');
                userEvent.type(vinElem, '12');
                userEvent.type(makeModelElem, 'MG');
                userEvent.type(yearElem, '2020');
                await selectEvent.select(colorNm, []);
                await selectEvent.select(statusElem, [""]);
                await selectEvent.select(truckParkingLotElem, [""]);
                await selectEvent.select(opexFuelTypeElem, [""]);
                saveBtn.removeAttribute('disabled');
                /* fire events that update state */
                userEvent.click(saveBtn);
            });

            await waitFor(() => {
                expect(result.getByTestId('toaster-message')).toBeInTheDocument();
            });
        });

        it('show toaster with failure message on submit form', async () => {
            serverMsw.use(
                rest.post('*', (req, res, ctx) => {
                    return res(
                        ctx.status(500),
                        ctx.json({
                            data: null,
                            error: {
                                details: ['fail add truck']
                            }
                        })
                    );
                })
            );
            const result = renderWithClient(<AddTruck version="Breadcrumbs-Single" />);
            await act(async () => {
                const { formElem, truckNameElem, licenseElem, vinElem, makeModelElem, colorNm, yearElem, statusElem, truckParkingLotElem, opexFuelTypeElem, saveBtn, cancelBtn } = getAllElements(result);
                userEvent.type(truckNameElem, 'Truck1');
                userEvent.type(licenseElem, '123');
                userEvent.type(vinElem, '12');
                userEvent.type(makeModelElem, 'MG');
                userEvent.type(yearElem, '2020');
                await selectEvent.select(colorNm, []);
                await selectEvent.select(statusElem, [""]);
                await selectEvent.select(truckParkingLotElem, [""]);
                await selectEvent.select(opexFuelTypeElem, [""]);
                saveBtn.removeAttribute('disabled');
                userEvent.click(saveBtn);
            });

        });
    });

});