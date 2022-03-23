import { cleanup, fireEvent, RenderResult, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { renderWithClient } from '../../../tests/utils';
import AddUser from "./index";
import routeDataDom from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: () => ({
        navigate: () => ({
            to: '/customer/*/users/edit/*'
        })
    }),
    useParams: () => ({
        customerId: '123',
        userId: 'test1234',
    })
}));

jest.mock('../../../store', () => ({
    ...jest.requireActual('../../../store') as any,
    useAddedCustomerIdStore: () => '123',
    useAddedCustomerPaymentTypeStore: () => 'Voyager'
}));

jest.mock('../../../navigation/utils', () => ({
    getCountryCode: () => 'us'
}));

function getAllElements (component: RenderResult) {
    const userGroupElem = component.container.querySelector('#userGroup') as HTMLInputElement;
    const userEmailElem = component.container.querySelector('#email') as HTMLInputElement;
    const userNameElem = component.container.querySelector('#userName') as HTMLInputElement;
    const userPhoneElem = component.container.querySelector('#phone') as HTMLInputElement;
    const verifyUserLink = component.container.querySelector('#verify-user-link') as HTMLAnchorElement;
    const cancelBtn = component.container.querySelector('#cancelBtn') as HTMLButtonElement;
    const saveBtn = component.container.querySelector('#saveBtn') as HTMLButtonElement;
    const formElem = component.container.querySelector('#form') as HTMLFormElement;
    return { userGroupElem, userEmailElem, userNameElem, userPhoneElem, verifyUserLink, cancelBtn, saveBtn, formElem };
}


afterEach(cleanup);

describe('EditUser with success', () => {
    it('Edit user with success save', async () => {
        const result = renderWithClient(<AddUser version="Breadcrumbs-Single" />);
        const { userEmailElem, saveBtn, userNameElem } = getAllElements(result);

        // Check Poplulated Form Values
        await waitFor(() => {
            expect(userEmailElem).toHaveValue("xyz@gmail.com");
            expect(userNameElem).toHaveValue("Nikhil Patel");
        });

        // Select USER GROUP ACCESS LEVEL
        const viewOnlyRadio = result.getByRole("radio", { name: "View only" }) as HTMLInputElement;
        fireEvent.click(viewOnlyRadio);

        // Click Save
        await waitFor(() => {
            expect(saveBtn).toBeEnabled();
            userEvent.click(saveBtn);
        });

        // Final Success Toast
        await waitFor(() => {
            expect(result.getByText('formStatusProps.editsuccess.message')).toBeInTheDocument();
        });
    });
});

describe('EditUser with Error', () => {
    beforeEach(() => {
        jest.spyOn(routeDataDom, 'useParams').mockImplementation(() => ({
            userId: 'test1111',
        }));
    });

    it('Edit user with error on save', async () => {
        const result = renderWithClient(<AddUser version="Breadcrumbs-Single" />);
        const { userEmailElem, saveBtn, userNameElem } = getAllElements(result);

        // Check Poplulated Form Values
        await waitFor(() => {
            expect(userEmailElem).toHaveValue("xyz@gmail.com");
            expect(userNameElem).toHaveValue("Nikhil Patel");
        });

        // Select USER GROUP ACCESS LEVEL
        const viewOnlyRadio = result.getByRole("radio", { name: "View only" }) as HTMLInputElement;
        fireEvent.click(viewOnlyRadio);

        // Click Save
        await waitFor(() => {
            expect(saveBtn).toBeEnabled();
            userEvent.click(saveBtn);
        });


        // Final Error Toast
        await waitFor(() => {
            expect(result.getByText('Edit User Operation failed')).toBeInTheDocument();
        });
    });
});
