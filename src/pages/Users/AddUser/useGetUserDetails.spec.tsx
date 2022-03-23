import { renderHook } from '@testing-library/react-hooks';
import { useEditUserData } from './queries';
import { rest } from 'msw';
import { createWrapper } from '../../../tests/utils';
import { serverMsw } from '../../../setupTests';
import { SettlementTypes } from '../config';


describe('useEditUserData for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useEditUserData(
            SettlementTypes.Voyager,
            [{ value: '111', label: 'testGrp', activeInactiveInd: 'Y', type: SettlementTypes.Voyager }],
            [{ value: '123', label: 'testDSP' }], 'test1234', jest.fn(), jest.fn()
        ), {
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

        const { result, waitFor } = renderHook(() => useEditUserData(
            SettlementTypes.Voyager,
            [{ value: '111', label: 'testGrp', activeInactiveInd: 'Y', type: SettlementTypes.Voyager }],
            [{ value: '123', label: 'testDSP' }], 'test1111', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});