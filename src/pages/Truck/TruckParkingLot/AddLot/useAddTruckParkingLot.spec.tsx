import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../../../setupTests";

import { createWrapper } from "../../../../tests/utils";
import { useAddTruckParkingLot } from "./queries";

describe('useAddTruckParkingLot for useMutation', ()=> {
    const payload = {
        "parkingLocationNm": "Packing Location 17",
        "addressLine1": "Address 1  ",
        "addressLine2":"Address 2",
        "cityNm": "Silchar",
        "stateNm":"Assam",
        "postalCd": "524345",
        "countryCode": "us"
    }

    
    it('Adds Truck parking lot success usiing useAddTruckParkingLot', async()=> {
        const { result, waitFor } = renderHook(()=> useAddTruckParkingLot(jest.fn(), jest.fn()), {
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

    it('fail to add data using useAddTruckParkingLot', async()=> {
        serverMsw.use(
            rest.post('*', (req, res, ctx)=> res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(()=> useAddTruckParkingLot(jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(()=> {
            result.current.mutate(payload as any);
        })
        
        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined()
    });
});