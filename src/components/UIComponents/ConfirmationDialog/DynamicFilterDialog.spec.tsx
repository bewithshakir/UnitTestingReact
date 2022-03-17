import { shallow } from 'enzyme';
import DynamicFilterDialog from './DynamicFilterDialog.component';
import { FilterDialogField } from './config';

const dynamicPopupFieldsData:FilterDialogField[] = [
    {
        name: 'fuelType',
        label: 'Select fuel type',
        required: true,
        fieldType: 'singleSelect',
        options: [{ label: 'fuel', value: 'fuel' }, { label: 'Non fuel', value: 'non fuuuuu' }],
        initialValue: { label: '', value: '' }

    },
    {
        name: 'multiFuelType',
        label: 'Select multiple fuel type',
        required: true,
        fieldType: 'multiSelect',
        options: [{ label: 'fuel', value: 'fuel' }, { label: 'Non fuel', value: 'non fuuuuu' }],
        initialValue: []
    },
    {
        name: 'multiCity',
        label: 'Multiple Select city',
        required: true,
        fieldType: 'multiSelect',
        apiUrl: '/api/tax-service/fuel-taxes/filter-options',
        responseFormatter:jest.fn(),
        extraApiParams: { countryCode: 'us' },
        placeHolder: 'Select multiple city',
        initialValue: []
    },
    {
        name: 'input123',
        label: 'Name',
        required: true,
        fieldType: 'text',
        initialValue: ""
    },
    {
        name: 'deliveryDate',
        label: 'delivery Date',
        required: true,
        fieldType: 'date',
        initialValue: null,
        placeHolder: 'select delivery date'
    },
    {
        name: 'pickupDateRange',
        label: 'Select Pickup Dates',
        required: true,
        fieldType: 'dateRange',
        initialValue: [null, null],
        dateRangerPlaceHolder: { start: "Start", end: "End" }
    },
    {
        name: 'addFuelTax',
        label: 'Add fuel tax',
        fieldType: 'checkbox',
        initialValue: false,
        required: true,
        disabled: false
    },
    {
        name: 'productType',
        label: 'Opis rack',
        fieldType: 'radio',
        initialValue: '',
        disabled: false,
        required: true,
        value: 'val1'
    },
    {
        name: 'productType',
        label: 'Opis retail',
        fieldType: 'radio',
        initialValue: '',
        disabled: false,
        required: true,
        value: 'val2'
    },
    {
        name: 'productType',
        label: 'Custom',
        fieldType: 'radio',
        initialValue: '',
        disabled: false,
        required: true,
        value: 'val3'
    },
    {
        name: 'city',
        label: 'Select city',
        required: true,
        fieldType: 'singleSelect',
        apiUrl: '/api/tax-service/fuel-taxes/filter-options',
        responseFormatter: jest.fn(),
        extraApiParams: { countryCode: 'us' },
        placeHolder: 'Select City',
    }];


describe('renders Dynamic filter dialog properly', () => {
    let DynamicFilterDialogComp: any;
    beforeAll(() => {        
        DynamicFilterDialogComp = shallow(
            <DynamicFilterDialog
                open={true}
                title=""
                handleConfirm={jest.fn()}
                handleToggle={jest.fn()}
                fields={dynamicPopupFieldsData}
            />);
    })

    it('snapshot testing', ()=>{
        expect(DynamicFilterDialogComp).toMatchSnapshot();
    });
})