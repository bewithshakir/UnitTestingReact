import { renderHook, act } from '@testing-library/react-hooks';
import { createWrapper } from '../../tests/utils';
import { useAttachmentList } from './queries';
import { serverMsw } from "../../setupTests";
import { rest } from 'msw';

describe('useSearch Attachment for useInfiniteQuery method ', () => {
    it('successfully returns data', async () => {
        const { result, waitFor } = renderHook(() => useAttachmentList('Sprint', { sortBy: '', order:'' },  { abc: [''] }, '167fd7be-c20e-412a-bac0-502672a055d6'), {
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

        const { result, waitFor } = renderHook(() => useAttachmentList('', { sortBy: '', order:'' },  { abc: [''] }, '167fd7be-c20e-412a-bac0-502672a055d6'), {
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
