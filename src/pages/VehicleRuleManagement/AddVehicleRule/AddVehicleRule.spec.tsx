import { mount } from 'enzyme';
import { cleanup, fireEvent, RenderResult, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { renderWithClient } from '../../../tests/utils';
import AddVehicleRule from "./index";

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => ({
        navigate: () => ({
            to: '/addVehicleRule'
        })
    }),
    // useParams: () => ({
    //     customerId: '123',
    // })
}));

function getAllElements (component: RenderResult) {
    const addLine1Ele = component.container.querySelector('#addLine1') as HTMLInputElement;
    const cityEle = component.container.querySelector('#city') as HTMLInputElement;
    const stateEle = component.container.querySelector('#state') as HTMLInputElement;
    const yearEle = component.container.querySelector('#year') as HTMLInputElement;
    const statusEle = component.container.querySelector('#status') as HTMLInputElement;
    const productEle = component.container.querySelector('#product') as HTMLInputElement;
    const cancelBtn = component.container.querySelector('#cancelBtn') as HTMLButtonElement;
    const saveBtn = component.container.querySelector('#saveBtn') as HTMLButtonElement;
    const formElem = component.container.querySelector('#vehicleRuleform') as HTMLFormElement;
    return { addLine1Ele, cityEle, stateEle, yearEle, statusEle, productEle, cancelBtn,  saveBtn, formElem };
}


afterEach(cleanup);

describe('Add vehicle Rule with success', () => {

    it('Add vehicle Rule snapshot testing overall', () => {
        const component = renderWithClient(<AddVehicleRule version="Breadcrumbs-Single"  />);
        expect(component).toBeDefined();
    });
    it('Add vehicle Rule with success save btn', async () => {
        const result = renderWithClient(<AddVehicleRule version="Breadcrumbs-Single" />);
        const { addLine1Ele, cityEle, stateEle, yearEle, statusEle, productEle , cancelBtn,  saveBtn, formElem } = getAllElements(result);

        await selectEvent.select(statusEle, "Enabled");

        waitFor(() => {
            fireEvent.change(addLine1Ele, { target: {value: 'ABC Auto Sales Inc,  Rixeyville Rd,'} } );
            fireEvent.change(stateEle, { target: { value: 'VA' } });
            fireEvent.change(cityEle, { target: { value: 'Culpeper' } });
            fireEvent.change(yearEle, { target: { value: '2001' } });
            selectEvent.select(productEle, ["Barun 1 test"]);
        });

         await waitFor(() => {
            expect(saveBtn).toBeEnabled();
            userEvent.click(saveBtn);
        });

         await waitFor(() => {
            expect(result.getByText('Data added successfully.')).toBeInTheDocument();
        });

    });
});

describe('Add vehicle Rule with Error', () => {

    it('Add vehicle Rule with error on save', async () => {
        // serverMsw.use(
        //     rest.post('*', (req, res, ctx) => {
        //         return res(
        //             ctx.status(500)
        //         );
        //     })
        // );

        const result = renderWithClient(<AddVehicleRule version="Breadcrumbs-Single" />);
        const { addLine1Ele, cityEle, stateEle, yearEle, statusEle, productEle , cancelBtn,  saveBtn, formElem } = getAllElements(result);

        fireEvent.change(addLine1Ele, {target: {value: 'El'}});

        console.log('111');
        await selectEvent.select(addLine1Ele, ["Elkton Test"]);
        console.log('222');
        // result.debug(await result.findByTestId('address-line'));
       



        // await selectEvent.select(statusEle, "Enabled");


        // waitFor(() => {
        //     fireEvent.change(addLine1Ele, { target: {value: 'ABC Auto'} } );
        //     fireEvent.change(stateEle, { target: { value: 'VA' } });
        //     fireEvent.change(cityEle, { target: { value: 'Culpeper' } });
        //     fireEvent.change(yearEle, { target: { value: '2009' } });
        //     selectEvent.select(productEle, ["Regular-Ethanol 12"]);
        // });

        //  await waitFor(() => {
        //     expect(saveBtn).toBeEnabled();
        //     userEvent.click(saveBtn);
        // });

        //  await waitFor(() => {
        //     expect(result.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
        // });
    });
});
