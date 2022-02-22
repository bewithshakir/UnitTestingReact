import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../../setupTests";

import { createWrapper } from "../../../tests/utils";
import { useGetAssetDetails } from "./queries";

describe('useGetAssetDetails for useMutation', () => {
    it('succesfull get data using useGetAssetDetails', async () => {
        const { result, waitFor } = renderHook(() => useGetAssetDetails("123", jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');

    });

    it('fail to get data using useGetAssetDetails', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetAssetDetails("123", jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});