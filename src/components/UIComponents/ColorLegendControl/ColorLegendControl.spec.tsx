import { fireEvent, RenderResult, waitFor, waitForElementToBeRemoved, render} from "@testing-library/react";
import selectEvent from "react-select-event";

import ColorLegendControl from ".";
import { renderWithClient } from "../../../tests/utils";

describe('ColorLegendControl renders', ()=> {
    let result: RenderResult;
    beforeEach(()=> {
        result = renderWithClient(<ColorLegendControl />);
    });

    it('click on Product button should open dropdown', async()=> {
        const productLegendsElem = result.container.querySelector('#productLegends') as HTMLInputElement;
        await selectEvent.select(productLegendsElem, ['Fuel - Barun 1 test']);
        
        await waitFor(()=> {
            const dropdownElem = result.container.querySelector('.react-select__menu');
            expect(dropdownElem).toBeInTheDocument();
        });

    });
});