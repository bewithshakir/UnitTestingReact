import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../../setupTests";

import { createWrapper } from "../../../tests/utils";
import { useAddUser } from "./queries";

describe('useAddUser for useMutation', () => {
    const payload = {
        "userId": "12345",
        "customerId": "123",
        "userName": "Nikhil Patel",
        "email": "xyz@gmail.com",
        "phone": "",
        "userAccessLevel": "5932",
        "userGroup": { "value": "555", "label": "DSP" },
        "countryCd": "us",
        "dsp": { "value": "01c4", "label": "DSP" },
    };

    it('succesfull add data using useAddUser', async () => {

        const { result, waitFor } = renderHook(() => useAddUser(jest.fn(), jest.fn()), {
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

    it('fail to add data using useAddUser', async () => {
        serverMsw.use(
            rest.post('*', (req, res, ctx) => res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(() => useAddUser(jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.mutate(payload as any);
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();
    });
});