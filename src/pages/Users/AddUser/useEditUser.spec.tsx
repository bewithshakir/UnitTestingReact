import { act, renderHook } from "@testing-library/react-hooks";
import { createWrapper } from "../../../tests/utils";
import { useUpdateUserData } from "./queries";

describe('useUpdateUserData for useMutation', () => {
    const successPayload = {
        "customerId": "123",
        "userAccessLevel": "5932",
        "userGroup": { "value": "555", "label": "DSP" },
        "countryCd": "us",
        "dsp": { "value": "01c4", "label": "DSP" },
    };

    const errorPayload = {
        "customerId": "123",
        "userAccessLevel": "5932",
        "userGroup": { "value": "555", "label": "DSP" },
        "countryCd": "us",
        "dsp": { "value": "01c4", "label": "DSP" },
    };

    it('succesfull edit data using useUpdateUserData', async () => {

        const { result, waitFor } = renderHook(() => useUpdateUserData('test1234', jest.fn(), jest.fn()), {
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

    it('erorr with edit data using useUpdateUserData', async () => {

        const { result, waitFor } = renderHook(() => useUpdateUserData('test1111', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });

        act(() => {
            result.current.mutate(errorPayload as any);
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();

    });
});