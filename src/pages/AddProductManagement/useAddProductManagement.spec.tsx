import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../setupTests";

import { createWrapper } from "../../tests/utils";
import { useAddProductManagement } from "./queries";

describe('useAddProductManagement for useMutation', ()=> {
    const payload = {
        "countryCode": "us",
        "productName": "Test Premium",
        "productType": "1",
        "productColor": "2",
        "productStatus": "Y",
        "productPricing": 0
    }

    
    it('succesfull add data using useAddProductManagement', async()=> {

        const { result, waitFor } = renderHook(()=> useAddProductManagement(jest.fn(), jest.fn()), {
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

    it('fail to add data using useAddProductManagement', async()=> {
        serverMsw.use(
            rest.post('*', (req, res, ctx)=> res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(()=> useAddProductManagement(jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(()=> {
            result.current.mutate(payload as any);
        })
        
        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined()
    });
});