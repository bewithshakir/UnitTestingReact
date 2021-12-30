import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';

import { createWrapper } from '../../tests/utils';
import { useGetProductColors } from './queries';
import { serverMsw } from "../../setupTests";
import { rest } from 'msw';

describe('useGetProductColors for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useGetProductColors('us'), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            // console.log('success coor--', result.current)
            return result.current.isSuccess
        })
        expect(result.current.status).toBe('success');
    })

    it('failure query hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500))
            })
        )

        const { result, waitFor } = renderHook(() => useGetProductColors('us'), {
            wrapper: createWrapper()
        })

        await waitFor(() => {
            return result.current.isError
        })

        expect(result.current.error).toBeDefined()
    });
})