import * as React from 'react';
import { shallow } from 'enzyme';
import ProductManagementLanding from './index';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

describe('Render Product management landing Page', () => {
    test('Render Product management landing Page', () => {
        const productManagementLanding = shallow(
            <QueryClientProvider client={queryClient}>
                <ProductManagementLanding />
            </QueryClientProvider>
        );
        expect(productManagementLanding).toMatchSnapshot();
    });
});