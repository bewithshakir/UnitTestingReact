/* eslint-disable no-console */
import { mount } from "enzyme";
import AddLotForm from './AddLotForm.component';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as any,
    useLocation: () => ({
        pathname: "localhost:3000/customer/123456/parkingLots/viewLot/89898"
    })
}));

beforeAll(() => {
    
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

const queryClient = new QueryClient();

describe('Rendering of View Lot Component', () => {
    it('Edit/View Lot component Snapshot testing when', () => {
        console.log('Normal: 34  ', new Date().getTime());
        const component = mount(<QueryClientProvider client={queryClient}>
            <AddLotForm />
        </QueryClientProvider>
        );

        expect(component).toMatchSnapshot();
    });
});

afterAll(() => {
    jest.useRealTimers();
});
