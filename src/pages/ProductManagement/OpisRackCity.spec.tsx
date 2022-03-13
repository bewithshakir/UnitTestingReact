import { mount } from 'enzyme';
import * as ReactQuery from 'react-query';
import OpisRackCity from './OpisRackCity';
const queryClient = new ReactQuery.QueryClient();

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

describe('Rendering of opis rack segment', () => {
    it('should render snapshot for opis rack segment', () => {
        const mockFormik = {
              touched: false,
              error: "",
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
                opisName: '',
                taxExemption: []
              },
              getFieldProps:jest.fn(),
              setFieldValue: jest.fn()
            };
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <OpisRackCity formik={mockFormik} 
            isDisabled={false} editMode={false} 
            setSupplierPrice={jest.fn()} isSaveCancelShown={false} productId={'abc'}/> </ReactQuery.QueryClientProvider >);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});

afterAll(() => {
    jest.useRealTimers();
});
