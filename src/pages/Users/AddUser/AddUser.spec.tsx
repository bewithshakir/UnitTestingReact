import { act, cleanup, fireEvent, RenderResult, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
// import { rest } from "msw";
import selectEvent from 'react-select-event';
// import { serverMsw } from "../../../setupTests";
import { renderWithClient } from '../../../tests/utils';
import AddUser from "./index";
// import * as Formik from 'formik';


jest.mock('react-router-dom', () => ({
    useNavigate: () => ({
        navigate: () => ({
            to: '/customer/*/users/addUser'
        })
    }),
    useParams: () => ({
        customerId: '123',
    })
}));

jest.mock('../../../store', () => ({
    ...jest.requireActual('../../../store') as any,
    useAddedCustomerIdStore: () => '123',
    useAddedCustomerPaymentTypeStore: () => 'Voyager'
}));

function getAllElements (component: RenderResult) {
    const userGroupElem = component.container.querySelector('#userGroup') as HTMLInputElement;
    const userEmailElem = component.container.querySelector('#email') as HTMLInputElement;
    const userNameElem = component.container.querySelector('#userName') as HTMLInputElement;
    const userPhoneElem = component.container.querySelector('#phone') as HTMLInputElement;
    // const userDSP = component.container.querySelector('#dsp') as HTMLInputElement;
    const verifyUserLink = component.container.querySelector('#verify-user-link') as HTMLAnchorElement;
    const cancelBtn = component.container.querySelector('#cancelBtn') as HTMLButtonElement;
    const saveBtn = component.container.querySelector('#saveBtn') as HTMLButtonElement;
    const formElem = component.container.querySelector('#form') as HTMLFormElement;
    return { userGroupElem, userEmailElem, userNameElem, userPhoneElem, verifyUserLink, cancelBtn, saveBtn, formElem };
}


afterEach(cleanup);
describe('renders AddUser component for add mode', () => {
    let result: RenderResult;
    beforeEach(() => {
        result = renderWithClient(<AddUser version="Breadcrumbs-Single" />);
    });

    it('renders all mendatory fields with blank value on add mode', () => {
        const { formElem, saveBtn } = getAllElements(result);
        expect(formElem).toBeInTheDocument();
        expect(saveBtn).toBeDisabled();
    });

    describe('AddUser screen on add mode', () => {

        it('enable save button when all mendatory fields are filled', async () => {

            const { userEmailElem, userGroupElem, verifyUserLink, saveBtn, userNameElem } = getAllElements(result);

            // Choose USER GROUP
            await selectEvent.select(userGroupElem, ["DSP"]);

            // Type EMAIL
            await waitFor(() => {
                fireEvent.change(userEmailElem, { target: { value: 'xyz@gmail.com' } });
            });

            // Click Verify
            act(() => {
                userEvent.click(verifyUserLink);
            });

            // Find USER NAME OR Phone
            await waitFor(() => {
                expect(userNameElem).toHaveValue("Nikhil Patel");
            });

            // Select USER GROUP ACCESS LEVEL
            const viewOnlyRadio = result.getByRole("radio", { name: "View only" }) as HTMLInputElement;
            fireEvent.click(viewOnlyRadio);

            // Choose DSP
            await waitFor(() => {
                const userDSP = result.container.querySelector('#dsp') as HTMLInputElement;
                selectEvent.select(userDSP, ["KrrishTest"]);
            });

            // Click Save
            await waitFor(() => {
                expect(saveBtn).toBeEnabled();
                userEvent.click(saveBtn);
            });

            // Final Success Toast
            await waitFor(() => {
                expect(result.getByText('formStatusProps.success.message')).toBeInTheDocument();
            });
        });
    });
});


/*
it('show toaster with error message on save button clicked', async () => {
           serverMsw.use(
               rest.post('*', (req, res, ctx) => {
                   return res(
                       ctx.status(500),
                       ctx.json({
                           data: null,
                           error: {
                               businessCode: 111,
                               details: null,
                               httpCode: 409,
                               message: "fail add asset"
                           }
                       })
                   );
               })
           );

           const { userGroupElem, userDSP, saveBtn } = getAllElements(result);
           fireEvent.change(userGroupElem, { target: { value: 'John' } });
           await selectEvent.select(userDSP, ["Enabled"]);

           await waitFor(() => {
               userEvent.tab();
               expect(saveBtn).toBeEnabled();
               userEvent.click(saveBtn);
           });
           await waitFor(() => {
               expect(result.getByText(/fail add asset/i)).toBeInTheDocument();
               expect(saveBtn).toBeDisabled();
           });
       });
*/