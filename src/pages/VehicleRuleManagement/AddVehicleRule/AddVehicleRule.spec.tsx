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

describe('AddUser with success', () => {

    it('Add product snapshot testing overall', () => {
        const component = renderWithClient(<AddVehicleRule version="Breadcrumbs-Single"  />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    // it('Add user with success save', async () => {
    //     const result = renderWithClient(<AddVehicleRule version="Breadcrumbs-Single" />);
    //     const { userEmailElem, userGroupElem, verifyUserLink, saveBtn, userNameElem } = getAllElements(result);

    //     // Choose USER GROUP
    //     await selectEvent.select(userGroupElem, ["DSP"]);

    //     // Type EMAIL
    //     await waitFor(() => {
    //         fireEvent.change(userEmailElem, { target: { value: 'xyz@gmail.com' } });
    //     });

    //     // Click Verify
    //     await waitFor(() => {
    //         userEvent.click(verifyUserLink);
    //     });

    //     // Find USER NAME OR Phone
    //     await waitFor(() => {
    //         expect(userNameElem).toHaveValue("Nikhil Patel");
    //     });

    //     // Select USER GROUP ACCESS LEVEL
    //     const viewOnlyRadio = result.getByRole("radio", { name: "View only" }) as HTMLInputElement;
    //     fireEvent.click(viewOnlyRadio);

    //     // Choose DSP
    //     await waitFor(() => {
    //         const userDSP = result.container.querySelector('#dsp') as HTMLInputElement;
    //         selectEvent.select(userDSP, ["KrrishTest"]);
    //     });

    //     // Click Save
    //     await waitFor(() => {
    //         expect(saveBtn).toBeEnabled();
    //         userEvent.click(saveBtn);
    //     });

    //     // Final Success Toast
    //     await waitFor(() => {
    //         expect(result.getByText('formStatusProps.success.message')).toBeInTheDocument();
    //     });
    // });
});

// describe('AddUser with Error', () => {
//     it('Add user with error on save', async () => {
//         const result = renderWithClient(<AddUser version="Breadcrumbs-Single" />);
//         const { userEmailElem, userGroupElem, verifyUserLink, saveBtn, userNameElem } = getAllElements(result);

//         // Choose USER GROUP
//         await selectEvent.select(userGroupElem, ["DSP"]);

//         // Type EMAIL
//         await waitFor(() => {
//             fireEvent.change(userEmailElem, { target: { value: 'abc@gmail.com' } });
//         });

//         // Click Verify
//         userEvent.click(verifyUserLink);

//         // Find USER NAME OR Phone
//         await waitFor(() => {
//             expect(userNameElem).toHaveValue("Nikhil Patel");
//         });

//         // Select USER GROUP ACCESS LEVEL
//         const viewOnlyRadio = result.getByRole("radio", { name: "View only" }) as HTMLInputElement;
//         fireEvent.click(viewOnlyRadio);

//         // Choose DSP
//         await waitFor(() => {
//             const userDSP = result.container.querySelector('#dsp') as HTMLInputElement;
//             selectEvent.select(userDSP, ["KrrishTest"]);
//         });

//         // Click Save
//         await waitFor(() => {
//             expect(saveBtn).toBeEnabled();
//             userEvent.click(saveBtn);
//         });

//         // Final Error Toast
//         await waitFor(() => {
//             expect(result.getByText('Shell Digital account with given is already added')).toBeInTheDocument();
//         });
//     });
// });
