// aa87757d-8e84-485c-a324-6e4b7e83a84e

import { cleanup, fireEvent, RenderResult, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { renderWithClient } from '../../../tests/utils';
import AddVehicleRule from "./index";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => ({
        navigate: () => ({
            to: '/editVehicleRule/*'
        })
    }),
    useParams: () => ({
        ruleId: 'aa87757d-8e84-485c-a324-6e4b7e83a84e'
    })
}));

jest.mock('../../../store', () => ({
    ...jest.requireActual('../../../store') as any,
    useAddedCustomerIdStore: () => 'Barun Demo 4'
}));


function getAllElements(component: RenderResult) {
    const addLine1Ele = component.container.querySelector('#addLine1') as HTMLInputElement;
    const cityEle = component.container.querySelector('#city') as HTMLInputElement;
    const stateEle = component.container.querySelector('#state') as HTMLInputElement;
    const yearEle = component.container.querySelector('#year') as HTMLInputElement;
    const statusEle = component.container.querySelector('#status') as HTMLInputElement;
    const productEle = component.container.querySelector('#product') as HTMLInputElement;
    const saveBtn = component.container.querySelector('#saveBtn') as HTMLButtonElement;
    const formElem = component.container.querySelector('#vehicleRuleform');
    return { addLine1Ele, cityEle, stateEle, yearEle, statusEle, productEle, saveBtn, formElem };
}


afterEach(cleanup);
describe('render edit vehicle form on edit vehicle page', () => {

    let result: RenderResult;
    beforeEach(() => {
        result = renderWithClient(<AddVehicleRule version="Breadcrumbs-Many" />);
    });

    it('renders form with data on EDIT mode', async () => {
        const { formElem, saveBtn } = getAllElements(result);
        await waitFor(() => {
            expect(formElem).toHaveFormValues({
                city: 'Culpeper'
            });
            expect(saveBtn).toBeDisabled();
        });
    });


    describe('save data in edit vehicle form', () => {
        it('enable save button when all mendatory fields are filled', async () => {
            const { yearEle, saveBtn } = getAllElements(result);
            fireEvent.change(yearEle, { target: { value: '2016' } });

            await waitFor(() => {
                expect(saveBtn).toBeEnabled();
            });
            userEvent.click(saveBtn);
            waitFor(() => {
                expect(result.getByText('Data updated successfully.')).toBeInTheDocument();
            });
        });
    });

});