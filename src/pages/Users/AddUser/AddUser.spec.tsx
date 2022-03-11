import { act, cleanup, fireEvent, RenderResult, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
// import { rest } from "msw";
import selectEvent from 'react-select-event';
// import { serverMsw } from "../../../setupTests";
import { renderWithClient } from '../../../tests/utils';
import AddUser from "./index";
import * as Formik from 'formik';


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


jest.mock('formik', () => ({
    ...jest.requireActual('formik') as any,
    useFormik: () => ({
        setFieldValue: jest.fn(),
        getFieldProps: jest.fn(),
        isValid: true,
        dirty: false,
        values: {
            userGroup: {
                label: '', value: ''
            }
        },
        touched: {
            userGroup: {}
        },
        errors: {
            userGroup: {}
        }
    })
}));

jest.mock('../../../store', () => ({
    ...jest.requireActual('../../../store') as any,
    useAddedCustomerIdStore: () => '123',
    useAddedCustomerPaymentTypeStore: () => 'Voyager'
}));

function getAllElements (component: any) {
    const userGroupElem = component.container.querySelector('#userGroup') as HTMLInputElement;
    const userEmailElem = component.container.querySelector('#email') as HTMLInputElement;
    const userNameElem = component.container.querySelector('#userName') as HTMLInputElement;
    const userPhoneElem = component.container.querySelector('#phone') as HTMLInputElement;
    const userDSP = component.container.querySelector('#dsp') as HTMLInputElement;
    const userAccessLevel = component.container.querySelector('#userAccessLevel-1');
    const verifyUserLink = component.container.querySelector('#verify-user-link');
    const cancelBtn = component.container.querySelector('#cancelBtn');
    const saveBtn = component.container.querySelector('#saveBtn');
    const formElem = component.container.querySelector('#form');
    return { userGroupElem, userEmailElem, userAccessLevel, userNameElem, userPhoneElem, userDSP, verifyUserLink, cancelBtn, saveBtn, formElem };
}


afterEach(cleanup);
describe('renders AddUser component for add mode', () => {
    let result: RenderResult;
    // const useFormik = jest.spyOn(Formik, 'useFormik');
    // eslint-disable-next-line no-console
    console.log("Formik", Formik);

    beforeEach(() => {
        result = renderWithClient(<AddUser version="Breadcrumbs-Single" />);
        // useFormik.mockReturnValue({
        //     setFieldValue: jest.fn(),
        //     isValid: true,
        //     dirty: false,
        // } as any);
    });

    it('renders all mendatory fields with blank value on add mode', () => {
        const { formElem, saveBtn } = getAllElements(result);
        expect(formElem).toBeInTheDocument();
        expect(saveBtn).toBeDisabled();
    });

    describe('AddUser screen on add mode', () => {

        it('enable save button when all mendatory fields are filled', async () => {

            const { userGroupElem, userEmailElem, userDSP } = getAllElements(result);
            //  verifyUserLink, saveBtn, userAccessLevel, userDSP
            await selectEvent.select(userGroupElem, ["DSP"]);
            fireEvent.change(userEmailElem, { target: { value: 'xyz@gmail.com' } });
            // eslint-disable-next-line no-console
            // console.log("Formik", Formik);


            await selectEvent.select(userDSP, ["KrrishTest"]);
            // eslint-disable-next-line no-console
            // console.log("🚀 ~ fi============================");
            // await waitFor(() => {
            //     selectEvent.select(userDSP, ["KrrishTest"]);
            // });

            // result.debug(await result.findByTestId("abc"));
            // act(() => {
            //     userEvent.click(verifyUserLink);
            // });
            // await waitFor(() => {
            //     expect(result.getByText(/Nikhil/i)).toBeInTheDocument();
            // });
            // // await selectEvent.select(userDSP, ["KrrishTest"]);
            // await userEvent.click(userAccessLevel);
            // await waitFor(() => {
            //     userEvent.click(saveBtn);
            // });

            // await waitFor(() => {
            //     expect(result.getByText('formStatusProps.success.message')).toBeInTheDocument();
            // });
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