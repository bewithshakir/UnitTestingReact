import { act, renderHook } from "@testing-library/react-hooks";
import { createWrapper } from '../../../tests/utils';
import { useGetDeliveryFeeSchd, useGetLotProductTypes, useGetLotVehicleTypes, useGetLotAssetTypes, useGetLotMasterProductNames, useGetLotProductNames, useAddFeeDetails } from './queries';
import { serverMsw } from "../../../setupTests";
import { rest } from 'msw';

describe('useGetDeliveryFeeSchd for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useGetDeliveryFeeSchd(), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetDeliveryFeeSchd(), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('useGetLotProductTypes for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useGetLotProductTypes('1234abc'), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetLotProductTypes('1234abc'), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('useGetLotVehicleTypes for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useGetLotVehicleTypes(), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetLotVehicleTypes(), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('useGetLotAssetTypes for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useGetLotAssetTypes(), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetLotAssetTypes(), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('useGetLotMasterProductNames for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useGetLotMasterProductNames('456abc'), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetLotMasterProductNames('456abc'), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('useGetLotProductNames for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useGetLotProductNames('7889', '190abb'), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetLotProductNames('7889', '190abb'), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('useAddFeeDetails for useMutation', () => {
    const payload = {
        "parkingLotId": "885346b1-bb12-4f9e-8f24-3c01118281e8",
        "feeName": "Test Fee 2",
        "deliveryFee": {
            "fee": "2.9088",
            "feeSchedule": "3831dcc6-0565-442f-b526-f709597c063b",
            "salesTaxExemption": "N"
        },
        "serviceFee": [
            {
                "misc": {
                    "isAllProductType": "N",
                    "isAllMasterProduct": "N",
                    "isAllVehicleType": "N",
                    "isAllAssetType": "N",
                    "productNameId": []
                },
                "fee": 3.5656565,
                "applicableProduct": "3831dcc6-0565-442f-b526-f709597c063b",
                "isAsset": "Y",
                "asseType": "3831dcc6-0565-442f-b526-f709597c063b",
                "assetInput": "This is test asset",
                "vehicleType": "cbce2906-8036-4f04-83ab-a981ba1db4ac"
            },
            {
                "misc": {
                    "isAllProductType": "N",
                    "isAllMasterProduct": "Y",
                    "isAllVehicleType": "N",
                    "isAllAssetType": "N",
                    "productNameId": ["2258a18e-e0af-4b01-8e42-2eef81cf23a6", "c3007c39-c477-4e24-a9a4-e8394e143523"]
                },
                "fee": 3.5656565,
                "applicableProduct": "",
                "isAsset": "Y",
                "asseType": "3831dcc6-0565-442f-b526-f709597c063b",
                "assetInput": "This is test asset",
                "vehicleType": "cbce2906-8036-4f04-83ab-a981ba1db4ac"
            }
        ]

    };


    it('succesful add data using useAddFeeDetails', async () => {

        const { result, waitFor } = renderHook(() => useAddFeeDetails(jest.fn(), jest.fn()), {
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

    it('fail to add data using useAddFeeDetails', async () => {
        serverMsw.use(
            rest.post('*', (req, res, ctx) => res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(() => useAddFeeDetails(jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.mutate(payload as any);
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();
    });
});