import { mount } from "enzyme";
import AddCustomer from './AddCustomer';
import { QueryClient, QueryClientProvider } from 'react-query';


const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => mockedUsedNavigate,
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
        const component = mount(<QueryClientProvider client={queryClient}>
            <AddCustomer version="Breadcrumbs-Single" />
        </QueryClientProvider>
        );

        expect(component).toMatchSnapshot();
    });
});

afterAll(() => {
    jest.useRealTimers();
});

