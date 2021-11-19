import { shallow } from 'enzyme';
import { DynamicFilterContent, IDynamicFilterProps } from './DynamicFilterContent.component';
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: any) => key }),
    Trans: ({ children }: any) => children
}));

const filterByFields: IDynamicFilterProps['fields'] = [
    { name: 'date', label: 'Date', fieldType: 'dateRange', initialValue: [null, null] },
    { name: 'state', label: 'customer-filter-panel.state', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'states', initialValue: [] },
    { name: 'city', label: 'customer-filter-panel.city', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'cities', initialValue: [] },
    { name: 'paymentType', label: 'customer-filter-panel.settlement type', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'settlementType', initialValue: [] },
    // { name: 'multiselect', label: 'multi checkbox', fieldType: 'multiCheckbox', initialValue: [], options: [{ label: 'checkbox1', value: 'cb1' }, { label: 'cbbbb2', value: 'cb2' }, { label: 'cb3', value: 'cb3' }] },
    // { name: 'radiotest', label: 'radio test', fieldType: 'radio', initialValue: null, options: [{ label: 'radio1', value: 'radiooo1' }, { label: 'radio2', value: 'radiooooo2' }] }
];
describe('Rendering of Dynamic filter component', () => {

    it('Dynamic filter component snapshot testing with textBox', () => {
        const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={[{ name: 'testText', label: 'dummy text', fieldType: 'text', initialValue: '' }]} storeKey={'abc'} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it('Dynamic filter component snapshot testing with single dropdown', () => {
        const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={[
            {
                name: 'SingleSelect1', label: 'Single Select', fieldType: 'select', singleSelect: true, options: [{ label: 'Regular', value: 'Regular', },
                { label: 'Premium', value: 'Premium', },
                { label: 'Diesel', value: 'Diesel', },], initialValue: null
            }]} storeKey={'abc'} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    it('Dynamic filter component snapshot testing with multi dropdown', () => {
        const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={[{ name: 'testText', label: 'dummy text', fieldType: 'select', initialValue: [], options: [{ label: 'option1', value: 'option1' }, { label: 'option2', value: 'option2' }] }]} storeKey={'abc'} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    it('Dynamic filter component snapshot testing with date', () => {
        const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={[{ name: 'date', label: 'Date', fieldType: 'date', initialValue: null }]} storeKey={'abc'} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    it('Dynamic filter component snapshot testing with daterange', () => {
        const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={[{ name: 'date', label: 'Date', fieldType: 'dateRange', initialValue: [null, null] }]} storeKey={'abc'} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    it('Dynamic filter component snapshot testing with checkbox', () => {
        const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={[
            { name: 'multiselect', label: 'multi checkbox', fieldType: 'multiCheckbox', initialValue: [], options: [{ label: 'checkbox1', value: 'cb1' }, { label: 'cbbbb2', value: 'cb2' }, { label: 'cb3', value: 'cb3' }] }
        ]} storeKey={'abc'} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    // it('Dynamic filter component snapshot testing with radio', () => {
    //     const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={[
    //         { name: 'radiotest', label: 'radio test', fieldType: 'radio', initialValue: null, options: [{ label: 'radio1', value: 'radiooo1' }, { label: 'radio2', value: 'radiooooo2' }] }
    //     ]} storeKey={'abc'} />);
    //     expect(component).toBeDefined();
    //     expect(component).toMatchSnapshot();
    // });
    it('Dynamic filter component snapshot testing with combined inputs', () => {
        const component = shallow(<DynamicFilterContent provideFilterParams={() => jest.fn()} onClose={() => jest.fn()} fields={filterByFields} storeKey={'abc'} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});