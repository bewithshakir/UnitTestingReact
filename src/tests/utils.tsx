import { render } from '@testing-library/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { addProductManagementHandler, editProductManagementHandler, getProductDataHandler, productColorsHandler, productTypesHandler } from '../pages/AddProductManagement/mockApi/handlerAddProduct';
import { getOPISCitiesHandler } from '../pages/OPISCity/mockApi/handlerOPISCityLandingPage';

export const handlers = [
    productTypesHandler(),
    productColorsHandler(),
    addProductManagementHandler(),
    getProductDataHandler(),
    editProductManagementHandler(),
    getOPISCitiesHandler(),
];

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export function renderWithClient (ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient();
    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    );
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
            ),
    };
}

export function createWrapper () {
    const testQueryClient = createTestQueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    );
}