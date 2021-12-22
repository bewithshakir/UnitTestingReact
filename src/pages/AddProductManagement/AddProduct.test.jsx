import { screen } from '@testing-library/dom';
import { renderWithClient } from '../../tests/utils';

import AddProduct from './AddProduct';

describe('AddProduct component', ()=> {
    it('renders AddProduct', ()=> {
        const result = renderWithClient(<AddProduct/>);
        expect(result).toBeDefined();
    });
    
});