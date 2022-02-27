import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../../setupTests";

import { createWrapper } from "../../../tests/utils";
import { useEditTruckDetails } from "./queries";

describe('useEditTruckDetails for useMutation', () => {
    const payload = {
        "colorCd": "551fa00b-cbd1-404f-ab0b-5dbf8ae62bf6",
        "activeInactiveInd": "Y",
        "deliveryVehicleNm": "Truck 21",
        "makeAndModelNm": "MG",
        "vinNo": "12345",
        "registrationYr": 2022,
        "registrationStateNm": "CA",
        "licenceNo": "12345",
        "productCd": "1bc78ae5-1fa2-4bc9-aee0-7a3f7f73ee7f",
        "parkingLocationIds": [
            "69e31e80-3190-4d9f-baa1-069264ae8987",
            "afa250fd-4540-42d7-9416-bc7a713224a4"

        ],
        "deliveryVehicleTanks": [
            {
                "productCd": "1bc78ae5-1fa2-4bc9-aee0-7a3f7f73ee7f",
                "tcsRegisterId": 111,
                "minCapacityVol": 1,
                "maxCapacityVol": 5
            }
        ]
    };

    it('succesfull add data using useEditTruckDetails', async () => {
        const { result, waitFor } = renderHook(() => useEditTruckDetails('a8898131-5add-4b76-aa92-8c7521bcb829', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });

        act(() => {
            result.current.mutate(payload as any);
        });

        await waitFor(()=> {
            return result.current.isSuccess;
        });
        
        expect(result.current.status).toBe('success');

    });

    it('fail to add data using useEditTruckDetails', async () => {
        serverMsw.use(
            rest.put('*', (req, res, ctx) => res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(() => useEditTruckDetails('a8898131-5add-4b76-aa92-8c7521bcb829', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.mutate(payload as any);
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();
    });
});