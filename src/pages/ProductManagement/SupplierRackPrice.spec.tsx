import { mount } from 'enzyme';
import * as ReactQuery from 'react-query';
import SupplierRackPrice from './SupplierRackPrice';
const queryClient = new ReactQuery.QueryClient();

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});
const mockFormik = {
    touched: {},
    error: "",
    errors: {},
    initialError: "",
    initialTouched: false,
    initialValue: "",
    values: {
        productType: { label: '', value: '' },
        masterProductName: { label: '', value: '' },
        pricingModel: { label: '', value: '' },
        productNm: '',
        manualPriceAmt: 0,
        addedPriceAmt: 0,
        discountPriceAmt: 0,
        city: '',
        cityId: '',
        state: '',
        supplier: [],
        branded: [],
        actualProduct: [],
        supplierPrice: 0,
        opisName: 'abc',
        taxExemption: []
    },
    getFieldProps: jest.fn(),
    setFieldValue: jest.fn()
};
describe('Rendering of supplier rack price', () => {
    it('should render snapshot for supplier rack price', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <SupplierRackPrice formik={mockFormik} isDisabled={false} setSupplierPrice={jest.fn()} resetSupplierValue={'xyz'} isSaveCancelShown={false} /> </ReactQuery.QueryClientProvider >);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it('should open popup on supplier rack price', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <SupplierRackPrice formik={mockFormik} isDisabled={false} setSupplierPrice={jest.fn()}  resetSupplierValue={'xyz'} isSaveCancelShown={false}/> </ReactQuery.QueryClientProvider >);
        expect(component).toBeDefined();
        component.find('.supplier-modal-btn').last().simulate('click');
    });
});

afterAll(() => {
    jest.useRealTimers();
});
