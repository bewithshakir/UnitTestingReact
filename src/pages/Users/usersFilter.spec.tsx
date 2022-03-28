import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";
import UsersLadingContent from ".";
import { renderWithClient } from "../../tests/utils";


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('render drawer on filter click', ()=> {
    it('show filter Drawer on "Filter" button clicked', async()=> {
        const result = renderWithClient(<UsersLadingContent version="Breadcrumbs-Single" />);
        const filterBtn = result.getByTestId('filter');
        userEvent.click(filterBtn);
        await waitFor(()=> {
            expect(result.getByTestId('right-drawer')).toBeInTheDocument();
        });
    });

    it('update data on apply button clicked', async()=> {
           
        const result = renderWithClient(<UsersLadingContent version='Breadcrumbs-Single' />);
        const filterBtn = result.getByTestId('filter');
        userEvent.click(filterBtn);

        
        await waitFor(()=> {
            expect(result.getByTestId('right-drawer')).toBeInTheDocument();
        });
        const userGrpElem = document.querySelector('#userGroupName') as HTMLInputElement;
        
        // select one  or two value...,
        await selectEvent.select(userGrpElem, ['user filter test']);
        const applyBtn = result.getByTestId('applyAll');
        expect(applyBtn).toBeEnabled();

        userEvent.click(applyBtn);
        await waitFor(()=> {
            expect(result.getByText(/USER NAME USER NAME/i)).toBeInTheDocument();
        });
        
    });

    it('reset data on clearAll button clicked', async()=> {
           
        const result = renderWithClient(<UsersLadingContent version='Breadcrumbs-Single' />);
        const filterBtn = result.getByTestId('filter');
        userEvent.click(filterBtn);

        
        await waitFor(()=> {
            expect(result.getByTestId('right-drawer')).toBeInTheDocument();
        });
        const userGrpElem = document.querySelector('#userGroupName') as HTMLInputElement;
        
        // select one  or two value...,
        // await selectEvent.select(userGrpElem, ['user filter test']);
        const clearAllBtn = result.getByTestId('clearAll');
        userEvent.click(clearAllBtn);

        await waitFor(()=> {
            const formElem = result.getByTestId('filterFormik');
            expect(formElem).toHaveFormValues({ userGroupName: "" });
            expect(result.getByText(/USER NAME USER NAME/i)).toBeInTheDocument();
        });
        
        
    });

    /* it('hide filter Drawer on "Filter" button clicked', async()=> {
        const result = renderWithClient(<UsersLadingContent version="Breadcrumbs-Single" />);
        const filterBtn = result.getByTestId('filter');
        userEvent.click(filterBtn);

        const closeBtn = result.getByTestId('closeIcon');
        userEvent.click(closeBtn);
    
        await waitForElementToBeRemoved(()=> {
            return result.getByTestId('right-drawer');
        });
    }); */
});