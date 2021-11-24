import { mount } from "enzyme";
import AddCustomer from './AddCustomer';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as any,
    useLocation: () => ({
        pathname: "localhost:3000/customer/addCustomer"
    })
}));

const queryClient = new QueryClient();
const setup = (props = {}) => mount(<QueryClientProvider client={queryClient}>
        <AddCustomer {...props} />
</QueryClientProvider>
);

describe('Rendering of View Customer Component', () => {
    const component = setup();    

    it('Edit/View Customer component Snapshot testing when', () => {
        expect(component).toMatchSnapshot();

    });

});