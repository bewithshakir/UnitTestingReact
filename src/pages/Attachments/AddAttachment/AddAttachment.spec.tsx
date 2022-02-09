import { mount } from "enzyme";
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, render, waitFor } from '@testing-library/react';
import AddAttachment from './AddAttachment';


const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => mockedUsedNavigate,
    useLocation: () => ({
        pathname: "localhost:3000/customer/123456/AddAttachment"
    })
}));

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

const queryClient = new QueryClient();

describe('Rendering of Add Attachment Component', () => {
    it('Upload Attachment Component Snapshot testing when', () => {
        const component = mount(<QueryClientProvider client={queryClient}>
            <AddAttachment version="Breadcrumbs-Many" />
        </QueryClientProvider>
        );
        expect(component).toMatchSnapshot();
    });


    it('Should accept a single file', async () => {
        const component = (
            <QueryClientProvider client={queryClient}>
                <AddAttachment version="Breadcrumbs-Many" />
            </QueryClientProvider>
        );
        const { container } = render(component);
        const fileInput = container.querySelector('[type="file"]');
        expect(fileInput).not.toHaveAttribute('multiple');
    });

    it('Should allow only .pdf,.xlsx,.docx file format', async () => {
        const component = (
            <QueryClientProvider client={queryClient}>
                <AddAttachment version="Breadcrumbs-Many" />
            </QueryClientProvider>
        );
        const { container, rerender } = render(component);
        const fileInput: any = container.querySelector('[type="file"]');
        expect(fileInput).toBeDefined();
        expect(fileInput).not.toHaveAttribute('multiple');

        await flushPromises(rerender, component);

        const file = new File(['sample'], 'sample.txt', { type: 'text/plain' });
        userEvent.upload(fileInput, file);

        await flushPromises(rerender, component);
        expect(fileInput.files[0]).toStrictEqual(file);
        expect(container.querySelector('.file-error')?.textContent).toBe('File type must be .pdf,.docx,.xlsx');
    });

    it('Should allow of size less than 25 MB', async () => {
        const component = (
            <QueryClientProvider client={queryClient}>
                <AddAttachment version="Breadcrumbs-Many" />
            </QueryClientProvider>
        );
        const { container, rerender } = render(component);
        const fileInput: any = container.querySelector('[type="file"]');
        expect(fileInput).toBeDefined();
        expect(fileInput).not.toHaveAttribute('multiple');

        await flushPromises(rerender, component);

        const file = new File(['sample'], 'sample.pdf', { type: 'text/application/pdf' });
        Object.defineProperty(file, 'size', {
            get () {
                return 30000000;
            }
        });

        userEvent.upload(fileInput, file);
        await flushPromises(rerender, component);
        expect(fileInput.files[0]).toStrictEqual(file);
        // console.debug("test------->",container.querySelector('.file-error'));
        expect(container.querySelector('.file-error')?.textContent).toBe('File is larger than 25 MB');
    });
});


async function flushPromises (rerender: any, ui: any) {
    await act(() => waitFor(() => rerender(ui)));
}
