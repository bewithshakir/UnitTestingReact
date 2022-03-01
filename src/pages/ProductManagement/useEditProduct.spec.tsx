import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../setupTests";
import { createWrapper } from "../../tests/utils";
import { useEditCustomProduct, useGetTaxRates, useGetServedCities , useGetSupplierPrices, useGetSupplierBrandProducts, useGetLotProductDetails} from "./queries";

describe('useEditCustomProduct for useMutation', ()=> {
    const payload = {
        "productId": "fe29b0ed-1380-4992-9734-ce71ffe76aa6",
        "pricingModelCd": "945d3d8b-57bb-42c8-88a5-2dae9cd230f0",
        "productNm": "Regular Retail",
        "manualPriceAmt": 3.766,
        "addedPriceAmt": 20.00,
        "discountPriceAmt": 0
      };

    
    it('succesfully edit cusom product data using useEditCustomProduct', async()=> {
        const { result, waitFor } = renderHook(()=> useEditCustomProduct('4535', '1231', jest.fn(), jest.fn()), {
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

    it('fail to edit product data using useEditCustomProduct', async()=> {
        serverMsw.use(
            rest.put('*', (req, res, ctx)=> res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(()=> useEditCustomProduct('1245353', '1342', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(()=> {
            result.current.mutate(payload as any);
        });
        
        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();
    });
});


describe('useGetTaxExemptions List for useQuery method', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() =>  useGetTaxRates(true, '1234abc', '324wf', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query  hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetTaxRates(true, '1234abc', '324wf', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('useGet Cities List for useQuery method', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() =>  useGetServedCities(), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query  hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetServedCities(), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('useGet SupplierPrices List for useQuery method', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() =>  useGetSupplierPrices({
            cityId: 'xyz',
            supplier: ['xyz'],
            brandIndicator: ['xyz'],
            actualProduct: ['xyz']
          }), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query  hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetSupplierPrices({
            cityId: 'xyz',
            supplier: ['xyz'],
            brandIndicator: ['xyz'],
            actualProduct: ['xyz']
          }), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});


describe('useGet SupplierBrandProducts List for useQuery method', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() =>  useGetSupplierBrandProducts('xyz'), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query  hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetSupplierBrandProducts('xyz'), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});

describe('useGet opis rack product details for useQuery method', () => {
    it('successful returns data', async () => {
        const { result, waitFor } = renderHook(() =>  useGetLotProductDetails('1234abc', '324wf', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('failure query  hook', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result, waitFor } = renderHook(() => useGetLotProductDetails('1234abc', '324wf', jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current.error).toBeDefined();
    });
});