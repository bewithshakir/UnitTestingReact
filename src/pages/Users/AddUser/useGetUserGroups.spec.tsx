import { renderHook } from '@testing-library/react-hooks';
import { useGetUserGroupTypes } from './queries';
import { rest } from 'msw';
import { createWrapper } from '../../../tests/utils';
import { serverMsw } from '../../../setupTests';

describe('useGetUserGroupTypes for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useGetUserGroupTypes('us'), {
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

        const { result, waitFor } = renderHook(() => useGetUserGroupTypes('us'), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});