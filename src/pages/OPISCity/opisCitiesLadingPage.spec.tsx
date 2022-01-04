import { waitFor } from "@testing-library/react";
import { renderWithClient } from '../../tests/utils';
import OPISCityLandingPage from "./index";

describe('load form data on edit mode', () => {
    it('load data in form', async () => {
        const result = renderWithClient(<OPISCityLandingPage />);
        await waitFor(async () => {
            expect(result.getByText(/102/i)).toBeInTheDocument();
            expect(result.getByText(/Los Angeles/i)).toBeInTheDocument();
            expect(result.getByText(/CA/i)).toBeInTheDocument();
        });
    });
});

describe('search city name load form data on edit mode', () => {
    it('load data in form', async () => {
        const result = renderWithClient(<OPISCityLandingPage />);
        await waitFor(async () => {
            expect(result.getByText(/Portland/i)).toBeInTheDocument();
        });
    });
});