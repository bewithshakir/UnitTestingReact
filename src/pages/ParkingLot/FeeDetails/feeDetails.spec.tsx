import { mount } from 'enzyme';
import FeeDetailsLandingPage from './index';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({

    ...jest.requireActual("react-router-dom"),
    useNavigate: () => ({
        location: {
            pathname: "/customer/123/parkingLots/viewLot/111122",
            state: { customerName: "MockCustomer" }
        }
    }),
    useLocation: () => ({
        pathname: "/customer/123/parkingLots/viewLot/111122",
        state: { customerName: "MockCustomer" }
    })
}));

// This resolves snapshot update issue
Date.now = jest.fn(() => 1638338756741);

beforeAll(() => {

    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});


describe('Given All ParkingLots Landing Page', () => {
    const Page = mount(
        <QueryClientProvider client={queryClient}>
            <FeeDetailsLandingPage />
        </QueryClientProvider>
    );
    test('Page Rendered Properly', () => {
        expect(Page).toMatchSnapshot();
    });

});