import { waitFor } from "@testing-library/react";
import { renderWithClient } from '../../tests/utils';
import { serverMsw } from '../../setupTests';
import { rest } from "msw";
import LandingPage from './index';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('get data on load in Landing Page', () => {
    it('load data', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        data: {
                            customerDocuments: [
                                {
                                    customerDocumentId: "95a6c816-05bd-4a6e-b2c5-bcf4b271b8f0",
                                    customerId: "045b08e9-5147-42dd-a8ed-0c6e01287189",
                                    documentName: "sample.pdf",
                                    documentFormat: "pdf",
                                    dateAdded: "2022-01-17T06:17:18.312Z",
                                    uploadedBy: "Abc",
                                    uploadedIn: "customerContract"
                                }
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
        const result = renderWithClient(<LandingPage version='1' />);
        await waitFor(() => {
            expect(result.getByText(/Abc/i)).toBeInTheDocument();
            expect(result.getByText(/customerContract/i)).toBeInTheDocument();
        });
    });
});


