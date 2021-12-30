import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../setupTests";

import { createWrapper } from "../../tests/utils";
import { useEditProductManagement } from "./queries";

describe('useEditProductManagement for useMutation', ()=> {
    const payload = {
        "countryCode": "us",
        "productName": "Test Premium",
        "productType": "1",
        "productColor": "2",
        "productStatus": "Y",
        "productPricing": 0
    }

    
    it('succesfull add data using useEditProductManagement', async()=> {
        const { result, waitFor } = renderHook(()=> useEditProductManagement('123', '2ss', jest.fn(), jest.fn()), {
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

    it('fail to add data using useEditProductManagement', async()=> {
        serverMsw.use(
            rest.put('*', (req, res, ctx)=> res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(()=> useEditProductManagement('123', '2ss', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(()=> {
            result.current.mutate(payload as any);
        })
        
        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined()
    });
});