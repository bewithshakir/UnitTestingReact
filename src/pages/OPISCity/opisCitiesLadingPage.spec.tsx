import { waitFor, act } from "@testing-library/react";
import { renderWithClient } from '../../tests/utils';
import OPISCityLandingPage from "./index";
import { serverMsw } from '../../setupTests';
import { rest } from "msw";
import userEvent from '@testing-library/user-event';
// import selectEvent from 'react-select-event';
// import { RightInfoPanel } from '../../components/UIComponents/RightInfoPanel/RightInfoPanel.component';
// import { OPISCity } from "./config";

function getAllElements (component: any) {
    const cityDropdownElem = component.container.querySelector('#city') as HTMLInputElement;
    const stateDropdownElem = component.container.querySelector('#state') as HTMLInputElement;
    const searchBox = component.container.querySelector('#opisCitySearch');
    const applyBtn = component.container.querySelector('#applyAll');
    const clearAllBtn = component.container.querySelector('[type="reset"]');
    const filterBtn = component.container.querySelector('#opisCityFilter');
    const formElem = component.container.querySelector('[class="dynamicForm"]');
    return { searchBox, formElem, filterBtn, cityDropdownElem, stateDropdownElem, applyBtn, clearAllBtn };
}


describe('load form data on edit mode', () => {
    it('load data in form', async () => {
        const result = renderWithClient(<OPISCityLandingPage />);
        await waitFor(() => {
            expect(result.getByText(/102/i)).toBeInTheDocument();
            expect(result.getByText(/Los Angeles/i)).toBeInTheDocument();
            expect(result.getByText(/CA/i)).toBeInTheDocument();
        });
    });
});

describe('search city name load form data on edit mode', () => {
    it('load data in form', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        data: {
                            opisCities: [
                                {
                                    city: "Los Angeles",
                                    cityId: 102,
                                    countryCd: "us",
                                    opisServedCityId: "943846a8-3cde-4d4a-b091-64108f687025",
                                    state: "CA",
                                },
                            ],
                            pagination: {
                                limit: 15,
                                offset: 0,
                                totalCount: 1,
                            }
                        },
                        error: null
                    })
                );
            })
        );
        const result = renderWithClient(<OPISCityLandingPage />);

        await act(() => {
            const { searchBox } = getAllElements(result);
            userEvent.type(searchBox, 'Los Angeles');
        });

        await waitFor(() => {
            expect(result.getByText(/102/i)).toBeInTheDocument();
            expect(result.getByText(/Los Angeles/i)).toBeInTheDocument();
            expect(result.getByText(/CA/i)).toBeInTheDocument();
        });
    });

    it('when search result not found', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        data: {
                            opisCities: [],
                            pagination: {
                                limit: 15,
                                offset: 0,
                                totalCount: 0,
                            }
                        },
                        error: null
                    })
                );
            })
        );
        const result = renderWithClient(<OPISCityLandingPage />);

        await act(() => {
            const { searchBox } = getAllElements(result);
            userEvent.type(searchBox, 'ABC City');
        });

        await waitFor(() => {
            expect(result.getByText(/Oops.. No Results Found/i)).toBeInTheDocument();
        });
    });
});

describe('OPIS city screen render with common filter functionality', () => {
    it('show filtered data', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        data: {
                            opisCities: [
                                {
                                    city: "Portland",
                                    cityId: 170,
                                    countryCd: "us",
                                    opisServedCityId: "958c1733-ee05-4648-b81d-158bc069dbda",
                                    state: "ME",
                                },
                            ],
                            pagination: {
                                limit: 15,
                                offset: 0,
                                totalCount: 1,
                            }
                        },
                        error: null
                    })
                );
            })
        );
        const result = renderWithClient(<OPISCityLandingPage />);

        await waitFor(() => {
            expect(result.getByText(/Portland/i)).toBeInTheDocument();
        });
    });
});