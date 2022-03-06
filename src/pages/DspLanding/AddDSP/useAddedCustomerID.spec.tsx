import { act, renderHook } from '@testing-library/react-hooks';
import { useAddedCustomerIdStore } from "../../../store";
describe('useAddedCustomerIdStore for useQuery method ', () => {
    it('successful returns customer id', async () => {
        const { result } = renderHook(() => useAddedCustomerIdStore());
        act(() => {
            result.current.setCustomerId('111');
        });

        expect(result.current.customerId).toBe('111');
    });
});