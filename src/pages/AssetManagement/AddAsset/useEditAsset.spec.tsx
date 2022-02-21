import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../../setupTests";

import { createWrapper } from "../../../tests/utils";
import { useEditAsset } from "./queries";

describe('useEditAsset for useMutation', () => {
    const payload = {
        countryCode: "us",
        assetNm: "Asset One",
        activeInactiveInd: "N"
    };

    it('succesfull add data using useEditAsset', async () => {
        const { result, waitFor } = renderHook(() => useEditAsset('123', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });

        act(() => {
            result.current.mutate(payload as any);
        });

        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('fail to add data using useEditAsset', async () => {
        serverMsw.use(
            rest.put('*', (req, res, ctx) => res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(() => useEditAsset('123', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.mutate(payload as any);
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();
    });
});