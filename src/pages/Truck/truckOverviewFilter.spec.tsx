import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TruckLandingContent from ".";
import { renderWithClient } from "../../tests/utils";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));


describe('render drawer on filter click', ()=> {
    it('show filter Drawer on "Filter" button clicked', async()=> {
       
        const result = renderWithClient(<TruckLandingContent version='1' />);
        const filterBtn = result.getByTestId('filter');
        userEvent.click(filterBtn);

        await waitFor(()=> {
            expect(result.getByTestId('filterDrawer')).toBeInTheDocument();
        });
    });

    it('hide filter Drawer on "Filter" button clicked', async()=> {
        const result = renderWithClient(<TruckLandingContent version="1" />);
        const filterBtn = result.getByTestId('filter');
        userEvent.click(filterBtn);

        const closeBtn = result.getByTestId('closeIcon');
        userEvent.click(closeBtn);
    
        await waitForElementToBeRemoved(()=> {
            return result.getByTestId('filterDrawer');
        });
    });
});