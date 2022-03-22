import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";
import UsersLadingContent from ".";
import { renderWithClient } from "../../tests/utils";

describe('render drawer on filter click', ()=> {
    it('show filter Drawer on "Filter" button clicked', async()=> {
        const result = renderWithClient(<UsersLadingContent version="Breadcrumbs-Single" />);
        const filterBtn = result.getByTestId('filter');
        userEvent.click(filterBtn);
        await waitFor(()=> {
            expect(result.getByTestId('right-drawer')).toBeInTheDocument();
        });
    });

    // it('update data on apply button clicked', async()=> {
           
    //     const result = renderWithClient(<UsersLadingContent version='Breadcrumbs-Single' />);
    //     const filterBtn = result.getByTestId('filter');
    //     userEvent.click(filterBtn);

        
    //     await waitFor(()=> {
    //         expect(result.getByTestId('right-drawer')).toBeInTheDocument();
    //     });
    //     const cityElem = document.querySelector('#state') as HTMLInputElement;
    //     // select one  or two value...,
    //     await selectEvent.select(cityElem, ['Dulles test']);
    //     const applyBtn = result.getByTestId('applyAll');
    //     expect(applyBtn).toBeEnabled();

    //     userEvent.click(applyBtn);
    //     await waitFor(()=> {
    //         expect(result.getByText(/DSP city search/i)).toBeInTheDocument();
    //     });

        
    // });

    it('hide filter Drawer on "Filter" button clicked', async()=> {
        const result = renderWithClient(<UsersLadingContent version="Breadcrumbs-Single" />);
        const filterBtn = result.getByTestId('filter');
        userEvent.click(filterBtn);

        const closeBtn = result.getByTestId('closeIcon');
        userEvent.click(closeBtn);
    
        await waitForElementToBeRemoved(()=> {
            return result.getByTestId('right-drawer');
        });
    });
});