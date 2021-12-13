import { shallow } from 'enzyme';
import ProductList from './ProductList';

const data = [
    { productNm: 'S P 1', pricingModel: { pricingModelNm: 'Custom' }, activeInactiveInd: 'Y', productColor: { productColorCode:'#DD1D21' }},
    { productNm: 'S P 2', pricingModel: { pricingModelNm: 'Custom' }, activeInactiveInd: 'N', productColor: { productColorCode:'#008443' }}
];

describe('Product list should be rendered', () => {
    
    test('render nodata table', () => {
        const component = shallow(<ProductList
            searchTerm=''
            searchTermInputChange={jest.fn()}
            handleRowAction={jest.fn()}
            productData={[]}
            isLoadingData={false}
            loadNextPage={false}
        />);
        expect(component.getElement()).toBeDefined();
    });
    test('render loading', () => {
        const component = shallow(<ProductList
            searchTerm=''
            searchTermInputChange={jest.fn()}
            handleRowAction={jest.fn()}
            productData={[]}
            isLoadingData={true}
            loadNextPage={false}
        />);
        expect(component.getElement()).toBeDefined();
    });
    test('render nextPage', () => {
        const component = shallow(<ProductList
            searchTerm=''
            searchTermInputChange={jest.fn()}
            handleRowAction={jest.fn()}
            productData={[]}
            isLoadingData={false}
            loadNextPage={false}
        />);
        expect(component.getElement()).toBeDefined();
    });
    test('render no results found', () => {
        const component = shallow(<ProductList
            searchTerm='xxxx'
            searchTermInputChange={jest.fn()}
            handleRowAction={jest.fn()}
            productData={[]}
            isLoadingData={false}
            loadNextPage={false}
        />);
        expect(component.getElement()).toBeDefined();
    });
    test('render when data', () => {
        const component = shallow(<ProductList
            searchTerm=''
            searchTermInputChange={jest.fn()}
            handleRowAction={jest.fn()}
            productData={data}
            isLoadingData={false}
            loadNextPage={false}
        />);
        expect(component.getElement()).toBeDefined();
    });
});