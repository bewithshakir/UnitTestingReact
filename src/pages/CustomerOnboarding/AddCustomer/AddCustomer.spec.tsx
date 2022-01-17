import { mount } from "enzyme";
import AddCustomer from './AddCustomer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';


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


    it('accepts a single files', async () => {
        const ui = (
            <QueryClientProvider client={queryClient}>
                <AddCustomer version="Breadcrumbs-Single" />
            </QueryClientProvider>
        );
        const { container } = render(ui);
        const fileInput = container.querySelector('[type="file"]');
        expect(fileInput).not.toHaveAttribute('multiple');
    });
});



describe('Rendering of Edit Lot Component', () => {
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom") as any,
        useLocation: () => ({
            pathname: "localhost:3000/customer/viewCustomer/12345678900"
        })
    }));

    it('Edit/View Customer component Snapshot testing', () => {
        const component = mount(<QueryClientProvider client={queryClient}>
            <AddCustomer version="Breadcrumbs-Single" />
        </QueryClientProvider>
        );
        expect(component).toMatchSnapshot();
    });

    it('Save button should be disabled', () => {
        const component = mount(<QueryClientProvider client={queryClient}>
            <AddCustomer version="Breadcrumbs-Single" />
        </QueryClientProvider>
        );
        expect(component.find('.btn-save').first().prop('disabled')).toBe(true);
    });

});

afterAll(() => {
    jest.useRealTimers();
});

