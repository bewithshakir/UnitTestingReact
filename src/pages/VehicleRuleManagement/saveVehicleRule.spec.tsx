import { renderHook, act } from '@testing-library/react-hooks';
import { createWrapper } from '../../tests/utils';
import { useAddVehicleRule } from './AddVehicleRule/queries';
import { serverMsw } from "../../setupTests";
import { rest } from 'msw';

const addVehicleRulePayload = {
    "countryCode": "us",
    "city": "Wernersville",
    "state": "PA",
    "yearNo": "2001",
    "productId": [
      "305a47f9-d29d-476a-bd5e-a8c15830a3b3",
      "d34d3402-36c2-483e-972e-f9ff01f8a47f"
    ],
    "activeInactiveInd": "Y"
  }

describe('save vehicle rule', () => {
    
    it('succesfully added vehicle rule', async()=> {
        const { result, waitFor } = renderHook(()=> useAddVehicleRule(jest.fn(), jest.fn()), {
            wrapper: createWrapper()
        });
        act(()=> {
            result.current.mutate(addVehicleRulePayload as any);
        });
        await waitFor(()=> {
            return result.current.isSuccess;
        });

        expect(result.current.status).toBe('success');
    });

    // it('fail to add vehicle rule', async()=> {
    //     serverMsw.use(
    //         rest.put('*', (req, res, ctx)=> res(ctx.status(500)))
    //     );
    //     const { result, waitFor } = renderHook(()=> useAddVehicleRule(jest.fn(), jest.fn()), {
    //         wrapper: createWrapper()
    //     });
    //     act(()=> {
    //         result.current.mutate(addVehicleRulePayload as any);
    //     });
        
    //     await waitFor(() => result.current.isError);
    //     expect(result.current.error).toBeDefined();
    // });
});
