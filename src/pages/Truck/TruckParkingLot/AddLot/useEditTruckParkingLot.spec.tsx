import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../../../setupTests";

import { createWrapper } from "../../../../tests/utils";
import { useEditTruckParkingLot } from "./queries";

describe('useEditTruckParkingLot for useMutation', ()=> {
    const payload = {
        "parkingLocationNm": "Packing Location 17",
        "addressLine1": "Address 1  ",
        "addressLine2":"Address 2",
        "cityNm": "Silchar",
        "stateNm":"Assam",
        "postalCd": "524345",
        "countryCode": "us"
    }

    
    it('Edit Truck parking lot success usiing useEditTruckParkingLot', async()=> {
        const { result, waitFor } = renderHook(()=> useEditTruckParkingLot('123',jest.fn(), jest.fn()), {
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

    it('fail to edit data using useEditTruckParkingLot', async()=> {
        serverMsw.use(
            rest.put('*', (req, res, ctx)=> res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(()=> useEditTruckParkingLot('123',jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(()=> {
            result.current.mutate(payload as any);
        })
        
        await waitFor(() => {
            return result.current.isError
        });
        expect(result.current.error).toBeDefined()
    });
});