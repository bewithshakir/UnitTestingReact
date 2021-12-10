import { mount } from 'enzyme';
import * as ReactQuery from 'react-query';
import AddProduct from './AddProduct';
const queryClient = new ReactQuery.QueryClient();


beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

describe('Rendering of Add product in Parking lot', () => {
    it('Add product snapshot testing', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddProduct lotId="" productId="" disableAddEditButton={false} /> </ReactQuery.QueryClientProvider >);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    it('Add product with Add Edit button', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddProduct lotId="" productId="" disableAddEditButton={true} /> </ReactQuery.QueryClientProvider >);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
    it('Add product without Add Edit button', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddProduct lotId="" productId="" disableAddEditButton={false} /> </ReactQuery.QueryClientProvider >);
        expect(component.find('.addProductBtn').exists()).toBe(true);
    });
    it('Add product button should be initally disabled', async () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddProduct lotId="" productId="" disableAddEditButton={false} /> </ReactQuery.QueryClientProvider >);
        expect(component.find('.saveProduct').first().prop('disabled')).toBe(true);
    });
});

afterAll(() => {
    jest.useRealTimers();
});
