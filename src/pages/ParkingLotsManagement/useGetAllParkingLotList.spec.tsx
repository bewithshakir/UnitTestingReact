import { renderHook } from '@testing-library/react-hooks';
import { createWrapper } from '../../tests/utils';
import { useAllParkingLotList } from './queries';
import { serverMsw } from "../../setupTests";
import { rest } from 'msw';

describe('useAllParkingLotList for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useAllParkingLotList("Lance", { sortBy: "", order: "", }, { "": [""] }), {
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

        const { result, waitFor } = renderHook(() => useAllParkingLotList("Lance", { sortBy: "", order: "", }, { "": [""] }), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('Seach ParkingLot with useAllParkingLotList method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useAllParkingLotList("Portland", { sortBy: "", order: "", }, { "": [""] }), {
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

        const { result, waitFor } = renderHook(() => useAllParkingLotList("Tempa", { sortBy: "", order: "", }, { "": [""] }), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('Filter ParkingLot with useAllParkingLotList method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useAllParkingLotList("", { sortBy: "", order: "", }, { "city": ["Portland"] }), {
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

        const { result, waitFor } = renderHook(() => useAllParkingLotList("", { sortBy: "", order: "", }, { "": [""] }), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});