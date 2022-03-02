import { waitFor } from '@testing-library/react';
import { renderWithClient } from '../../tests/utils';
import TruckDetail from './TruckDetail';

describe('renders Truck Details', () => {
    it('show truck overview details in side panel', async () => {
        const result = renderWithClient(<TruckDetail info={{ deliveryVehicleId: "999" }} drawerOpen={true} />);
        await waitFor(() => {
            expect(result.getByText(/HCM_Truck12345500/i)).toBeInTheDocument();
        });
    });
});