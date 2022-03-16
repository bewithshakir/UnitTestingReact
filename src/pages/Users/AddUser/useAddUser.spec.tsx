import { act, renderHook } from "@testing-library/react-hooks";
import { createWrapper } from "../../../tests/utils";
import { useAddUser } from "./queries";

describe('useAddUser for useMutation', () => {
    const successPayload = {
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
    const errorPayload = {
        "userId": "12345",
        "customerId": "123",
        "userName": "Nikhil Patel",
        "email": "abc@gmail.com",
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
            result.current.mutate(successPayload as any);
        });

        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');

    });

    it('erorr with add data using useAddUser', async () => {

        const { result, waitFor } = renderHook(() => useAddUser(jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });

        act(() => {
            result.current.mutate(errorPayload as any);
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();

    });
});