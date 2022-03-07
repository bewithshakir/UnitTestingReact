import { renderHook, act } from '@testing-library/react-hooks';
import { createWrapper } from '../../tests/utils';
import { DspListSet } from './queries';
import { serverMsw } from "../../setupTests";
import { rest } from 'msw';

describe('DspListSet for useInfiniteQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => DspListSet("", { sortBy: "", order: "", }, '111edit', {}), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.fetchNextPage();
        });
        await waitFor(() => {
            console.log('result--', result.current.data)
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

        const { result, waitFor } = renderHook(() => DspListSet("", { sortBy: "", order: "", }, '111edit', {}), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.fetchNextPage();
        });
        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});
