import { renderHook, act } from '@testing-library/react-hooks';
import { createWrapper } from '../../tests/utils';
import { UseGetUserListSet } from './queries';
import { serverMsw } from "../../setupTests";
import { rest } from 'msw';

describe('UsersListSet for useInfiniteQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => UseGetUserListSet("", { sortBy: "", order: "", }, 'c905ebe1-325a-4e27-b44e-d1049848e7a8', {}), {
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

    it('failure query hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => UseGetUserListSet("", { sortBy: "", order: "", }, 'c905ebe1-325a-4e27-b44e-d1049848e7a8', {}), {
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
