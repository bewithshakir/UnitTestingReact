import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../../setupTests";

import { createWrapper } from "../../../tests/utils";
import { useAddDsp } from "./queries";

describe('useAddDsp for useMutation', ()=> {
    const payload = {
        "customerId": "53ec5820-bc55-45e5-bc42-7a2c61d32fba",
        "dspName" : "new dsp12",
        "contactName": "steve",
        "contactEmailId": "newcustomer@gmail.com",
        "contactPhoneNumber": "8939785301",
        "addressLine1": "Houston Court, , , ",
        "addressLine2": "Houston Ct",
        "cityNm": "Saratoga",
        "stateNm": "CA",
        "postalCd": 95070
    }

    
    it('succesfull add data using useAddDsp', async()=> {

        const { result, waitFor } = renderHook(()=> useAddDsp(jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        
        act(()=> {
            result.current.mutate(payload as any);
        });

        await waitFor(()=> {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
        // expect(result.current.data?.data.saleableProductNm).toBe('test Premium')
        
    });

    it('fail to add data using useAddDsp', async()=> {
        serverMsw.use(
            rest.post('*', (req, res, ctx)=> res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(()=> useAddDsp(jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(()=> {
            result.current.mutate(payload as any);
        })
        
        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined()
    });
});