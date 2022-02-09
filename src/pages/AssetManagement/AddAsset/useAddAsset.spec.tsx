import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../../setupTests";

import { createWrapper } from "../../../tests/utils";
import { useAddAsset } from "./queries";

describe('useAddAsset for useMutation', ()=> {
    const payload = {
        title: 'foo2',
        body: 'bar2',
        userId: 2,
    }

    
    it('succesfull add data using useAddAsset', async()=> {

        const { result, waitFor } = renderHook(()=> useAddAsset(jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        
        act(()=> {
            result.current.mutate(payload as any);
        });

        await waitFor(()=> {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
        
    });

    it('fail to add data using useAddAsset', async()=> {
        serverMsw.use(
            rest.post('*', (req, res, ctx)=> res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(()=> useAddAsset(jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(()=> {
            result.current.mutate(payload as any);
        })
        
        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined()
    });
});