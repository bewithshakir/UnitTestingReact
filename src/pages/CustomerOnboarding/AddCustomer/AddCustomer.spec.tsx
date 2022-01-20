import { mount } from "enzyme";
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, render, waitFor } from '@testing-library/react';
import AddCustomer from './AddCustomer';


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

    it('Allow only .pdf,.docx,.xlsx file extension', async () => {
        const ui = (
            <QueryClientProvider client={queryClient}>
                <AddCustomer version="Breadcrumbs-Single" />
            </QueryClientProvider>
        );
        const { container, rerender } = render(ui);
        const fileInput: any = container.querySelector('[type="file"]');
        expect(fileInput).toBeDefined();
        expect(fileInput).not.toHaveAttribute('multiple');

        await flushPromises(rerender, ui);

        const file = new File(['hello'], 'hello.text', { type: 'text/plain' });
        userEvent.upload(fileInput, file);

        await flushPromises(rerender, ui);
        expect(fileInput.files[0]).toStrictEqual(file);
        expect(container.querySelector('.import-error')?.textContent).toBe('File type must be .pdf,.docx,.xlsx');
    });

    it('Allow only less than 25 MB in size', async () => {
        const ui = (
            <QueryClientProvider client={queryClient}>
                <AddCustomer version="Breadcrumbs-Single" />
            </QueryClientProvider>
        );
        const { container, rerender } = render(ui);
        const fileInput: any = container.querySelector('[type="file"]');
        expect(fileInput).toBeDefined();
        expect(fileInput).not.toHaveAttribute('multiple');

        await flushPromises(rerender, ui);

        const file = new File(['hello'], 'hello.pdf', { type: 'text/application/pdf' });
        Object.defineProperty(file, 'size', {
            get() {
                return 30000000;
            }
        });

        userEvent.upload(fileInput, file);
        await flushPromises(rerender, ui);
        expect(fileInput.files[0]).toStrictEqual(file);
        expect(container.querySelector('.import-error')?.textContent).toBe('File is larger than 25 MB');
    });
});



describe('Rendering of Edit Lot Component', () => {
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom") as any,
        useLocation: () => ({
            pathname: "localhost:3000/customer/viewCustomer/12345678900"
        })
    }));

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


async function flushPromises(rerender: any, ui: any) {
    await act(() => waitFor(() => rerender(ui)));
}
