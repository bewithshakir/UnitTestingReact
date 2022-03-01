import { RenderResult, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import { renderWithClient } from "../../../tests/utils";
import SortbyMenu from "./SortbyMenu.component";

describe("render SortbyMenu component", ()=> {
    const options = ['Lot Name A-Z', 'Lot Name Z-A'];
    const onSelectFn = jest.fn();
    let result: RenderResult;
    beforeEach(()=> {
        result = renderWithClient(<SortbyMenu 
            options={options.map((sortByItem) => sortByItem)}
            onSelect={onSelectFn}/>
        );
        const sortBtn = result.getByRole('button', { name: /sortby menu list/i });
        userEvent.click(sortBtn);
    });
    it('Click on Sort button dropdown should open with mandatory fields', async()=> {
        await waitFor(()=> {
            expect(result.getByTestId('sortby-dropdown')).toBeInTheDocument();
        });
        
    });
    it('hide dropdown on select of option', async()=> {
        const menuListElem = result.getByRole('menuitem', { name: /lot name a\-z/i });
        userEvent.click(menuListElem);

        await waitForElementToBeRemoved(() => result.getByTestId('sortby-dropdown'));
        
    });
});