import { act, renderHook } from "@testing-library/react-hooks";
import { createWrapper } from '../../../tests/utils';
import { useGetDeliveryFeeSchd, useGetLotProductTypes, useGetLotVehicleTypes, useGetLotAssetTypes, useGetLotMasterProductNames, useGetLotProductNames, useAddFeeDetails, useGetFeeDetailsByLotid, useEditFeeDetails } from './queries';
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



describe('useGetFeeDetailsByLotid for useQuery method ', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() => useGetFeeDetailsByLotid('1234'), {
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


describe('useEditFeeDetails for useMutation', () => {
    const payload = {
        "parkingLotId": "877a3586-4766-4050-8128-d85e2d956736",
        "feeName": "Test",
        "deliveryFee": {
            "applicableFeeId": "40085e2f-ae80-4495-9dac-95b1994aa4e5",
            "fee": "1",
            "feeSchedule": "04a06dbf-9f2f-4414-aae8-9045aad0cb87",
            "salesTaxExemption": "Y"
        },
        "serviceFee": [
            {
                "applicableFeeId": "6dcd4cd0-08e6-4a35-bc0c-972762b77a22",
                "misc": {
                    "applicableFeeMiscId": "caa010db-6012-4a76-99ce-62e3d288f0b9",
                    "isAllProductType": "N",
                    "isAllMasterProduct": "N",
                    "isAllVehicleType": "N",
                    "isAllAssetType": "N",
                    "productNameId": []
                },
                "fee": "1",
                "applicableProduct": "e02bca82-7343-48bb-877e-18212838d26c",
                "asseType": "b6c3938d-c97d-40fe-9c93-3b10046ae359",
                "assetInput": "test asset",
                "isAsset": "Y"
            },
            {
                "applicableFeeId": "9bf8b799-bf7e-4c5b-ac5e-1359e18b2956",
                "misc": {
                    "applicableFeeMiscId": "4cccbeae-971d-49b0-a32e-f5faae3af744",
                    "isAllProductType": "Y",
                    "isAllMasterProduct": "Y",
                    "isAllVehicleType": "N",
                    "isAllAssetType": "N",
                    "productNameId": [
                        "1ab6b8d8-c451-4a09-869f-6381960a78ee",
                        "7ee907ab-d319-4cc0-95e5-c90f873ab214"
                    ]
                },
                "fee": "10",
                "vehicleType": "00564273-9d49-46d2-a61d-836e978239f3",
                "isAsset": "N"
            }
        ]
    };


    it('succesful add data using useEditFeeDetails', async () => {
        serverMsw.use(
            rest.put('*', (req, res, ctx) => res(ctx.status(200)))
        );
        const { result, waitFor } = renderHook(() => useEditFeeDetails(jest.fn(), jest.fn()), {
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

    it('fail to add data using useEditFeeDetails', async () => {
        serverMsw.use(
            rest.put('*', (req, res, ctx) => res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(() => useEditFeeDetails(jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.mutate(payload as any);
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();
    });
});
