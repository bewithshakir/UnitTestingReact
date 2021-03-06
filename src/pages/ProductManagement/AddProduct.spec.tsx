import { mount } from 'enzyme';
import * as ReactQuery from 'react-query';
import AddProduct from './AddProduct';
const queryClient = new ReactQuery.QueryClient();
import Select from '../../components/UIComponents/Select/SingleSelect';

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));


describe('Rendering of Add product in Parking lot', () => {
    it('Add product snapshot testing overall', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddProduct lotId="" productId="" disableAddEditButton={false} isHiddenAddEditRow={false} /> </ReactQuery.QueryClientProvider >);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    it('Add product with Add Edit button', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddProduct lotId="" productId="" disableAddEditButton={false} isHiddenAddEditRow={false} /> </ReactQuery.QueryClientProvider >);
        expect(component.find('.addProductBtn').exists()).toBe(true);
    });
    it('Add product without Add Edit button', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddProduct lotId="" productId="" disableAddEditButton={true} isHiddenAddEditRow={true} /> </ReactQuery.QueryClientProvider >);
        expect(component.find('.addProductBtn').exists()).toBe(false);
    });
    it('Add Edit button should be disabled', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddProduct lotId="" productId="" disableAddEditButton={true} isHiddenAddEditRow={false} /> </ReactQuery.QueryClientProvider >);
        expect(component.find('.addProductBtn').first().prop('disabled')).toBe(true);
    });
    it('Add product button should be initally disabled', async () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddProduct lotId="" productId="" disableAddEditButton={false} isHiddenAddEditRow={false} /> </ReactQuery.QueryClientProvider >);
        expect(component.find('.saveProduct').first().prop('disabled')).toBe(true);
    });
    it('check if the Product Type, Master Product Names, Pricing Model drop down exixts in the Add Product Component', async () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddProduct lotId="" productId="" disableAddEditButton={false} isHiddenAddEditRow={false} /> </ReactQuery.QueryClientProvider >);
        expect(component.find(Select).exists()).toBe(true);
        expect(component.find(Select)).toHaveLength(3);
    });
});

afterAll(() => {
    jest.useRealTimers();
});
