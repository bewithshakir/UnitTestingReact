import { renderHook } from '@testing-library/react-hooks';
import { createWrapper } from '../../../tests/utils';
import { useEditDspData } from './queries';
import { serverMsw } from "../../../setupTests";
import { rest } from 'msw';

describe('useGetProductTypes for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useEditDspData('111edit', '22', jest.fn(), jest.fn()), {
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

        const { result, waitFor } = renderHook(() => useEditDspData('111edit', '22', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});