import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../setupTests";
import { createWrapper } from "../../tests/utils";
import { useFuelTaxList, getProducts } from './queries';


describe('GetFuelTaxList', () => {
    it('Success returns data', async () => {
        const { result, waitFor } = renderHook(() => useFuelTaxList('', { sortBy: "", order: "" }, {}), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.fetchNextPage();
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('fail to get data', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(() => useFuelTaxList('', { sortBy: "", order: "" }, {}), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.fetchNextPage();
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();
    });
});

describe('GetProductsByTaxId', () => {
    it('Success returns data', async () => {
        const { result, waitFor } = renderHook(() => getProducts('99zz'), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.fetchNextPage();
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('fail to get data', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(() => getProducts('99zz'), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.fetchNextPage();
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();
    });
});