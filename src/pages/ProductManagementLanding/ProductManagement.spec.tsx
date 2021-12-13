import * as React from 'react';
import { shallow } from 'enzyme';
import ProductManagementLanding from './index';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('Render Product management landing Page', () => {
    test('Render Product management landing Page', () => {
        const productManagementLanding = shallow(
            <ProductManagementLanding />
        );
        expect(productManagementLanding).toMatchSnapshot();
    });
});