/* eslint-disable no-console */
import { mount } from "enzyme";
import AddCustomer from './AddCustomer';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as any,
    useLocation: () => ({
        pathname: "localhost:3000/customer/addCustomer"
    })
}));

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

const queryClient = new QueryClient();

describe('Rendering of View Customer Component', () => {
    it('Edit/View Customer component Snapshot testing when', () => {
        console.log('Normal: 34  ', new Date().getTime());
        const component= mount(<QueryClientProvider client={queryClient}>
            <AddCustomer />
        </QueryClientProvider>
        );

        expect(component).toMatchSnapshot();
    });
});

afterAll(() => {
    jest.useRealTimers();
});

