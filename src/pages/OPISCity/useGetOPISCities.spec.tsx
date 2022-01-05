import { renderHook } from '@testing-library/react-hooks';
import { createWrapper } from '../../tests/utils';
import { useOPISCityList } from './queries';
import { serverMsw } from "../../setupTests";
import { rest } from 'msw';

describe('useOPISCityList for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useOPISCityList("", { sortBy: "", order: "", }, { "": [""] }), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useOPISCityList("", { sortBy: "", order: "", }, { "": [""] }), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('Seach OPISCity with useOPISCityList method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useOPISCityList("Portland", { sortBy: "", order: "", }, { "": [""] }), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useOPISCityList("Tempa", { sortBy: "", order: "", }, { "": [""] }), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('Filter OPISCity with useOPISCityList method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useOPISCityList("", { sortBy: "", order: "", }, { "city": ["Portland"] }), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useOPISCityList("", { sortBy: "", order: "", }, { "": [""] }), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});