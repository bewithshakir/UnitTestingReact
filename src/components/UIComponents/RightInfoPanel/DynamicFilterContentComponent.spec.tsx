import { shallow } from 'enzyme';
import { DynamicFilterContent, IDynamicFilterProps } from './DynamicFilterContent.component';
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: any) => key }),
    Trans: ({ children }) => children
}));

const filterByFields: IDynamicFilterProps['fields'] = [
    { name: 'date', label: 'Date', fieldType: 'dateRange', initialValue: [null, null] },
    { name: 'state', label: 'customer-filter-panel.state', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'states', initialValue: [] },
    { name: 'city', label: 'customer-filter-panel.city', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'cities', initialValue: [] },
    { name: 'paymentType', label: 'customer-filter-panel.settlement type', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'settlementType', initialValue: [] },
];
describe('Rendering of Dynamic filter component', () => {

    it('Dynamic filter component snapshot testing with textBox', () => {
        const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={[{ name: 'testText', label: 'dummy text', fieldType: 'text', initialValue: '' }]} storeKey={'abc'} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    it('Dynamic filter component snapshot testing with dropdown', () => {
        const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={[{ name: 'testText', label: 'dummy text', fieldType: 'select', initialValue: [], options: [{ label: 'option1', value: 'option1' }, { label: 'option2', value: 'option2' }] }]} storeKey={'abc'} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    it('Dynamic filter component snapshot testing with daterange', () => {
        const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={[{ name: 'date', label: 'Date', fieldType: 'dateRange', initialValue: [null, null] }]} storeKey={'abc'} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    it('Dynamic filter component snapshot testing with combined inputs', () => {
        const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={filterByFields} storeKey={'abc'} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

});