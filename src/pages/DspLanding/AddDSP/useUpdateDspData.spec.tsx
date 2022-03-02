import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../../setupTests";

import { createWrapper } from "../../../tests/utils";
import { useUpdateDspData } from "./queries";

describe('useEditProductManagement for useMutation', () => {
    const payload = {
        "customerId": "111",
        "dspName": "new dsp updated",
        "contactName": "steve",
        "contactEmailId": "newcustomer@gmail.com",
        "contactPhoneNumber": "8939785301",
        "addressLine1": "Houston Court ",
        "addressLine2": "Houston Ct",
        "cityNm": "Saratoga",
        "stateNm": "CA",
        "postalCd": 95070
    };


    it('succesfull add data using useEditProductManagement', async () => {
        const { result, waitFor } = renderHook(() => useUpdateDspData('222', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });

        act(() => {
            result.current.mutate(payload as any);
        });

        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
        // expect(result.current.data?.data.saleableProductNm).toBe('test Premium')

    });

    it('fail to add data using useEditProductManagement', async () => {
        serverMsw.use(
            rest.put('*', (req, res, ctx) => res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(() => useUpdateDspData('222', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.mutate(payload as any);
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();
    });
});