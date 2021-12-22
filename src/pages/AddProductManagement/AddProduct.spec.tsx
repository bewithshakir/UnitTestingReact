import { renderWithClient } from '../../tests/utils';
import { mount } from "enzyme";
import { QueryClientProvider } from 'react-query';
import * as ReactQuery from 'react-query';
import AddProduct from './AddProduct';




const queryClient = new ReactQuery.QueryClient();

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

describe('AddProduct component', () => {
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom") as any,
        useLocation: () => ({
            pathname: "localhost:3000/productManagement/edit/056517cc-91d1-4329-8911-45c0f4dfec10"
        })
    }));

    it('renders AddProduct', () => {
        const result = renderWithClient(<AddProduct />);
        expect(result).toBeDefined();
    });
});

describe('Rendering of Edit Product Component', () => {
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom") as any,
        useLocation: () => ({
            pathname: "localhost:3000/productManagement/edit/056517cc-91d1-4329-8911-45c0f4dfec10"
        })
    }));

    it('Edit/View Product component Snapshot testing', () => {
        const component = mount(<QueryClientProvider client={queryClient}>
            <AddProduct />
        </QueryClientProvider>
        );
        expect(component).toMatchSnapshot();
    });
});

afterAll(() => {
    jest.useRealTimers();
});
