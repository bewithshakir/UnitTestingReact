
import { waitFor } from '@testing-library/react';
import { renderWithClient } from '../../../tests/utils';
import VehiclManagement from './index';
jest.mock('react-router-dom', () => ({
    useNavigate: () => ({
        navigate: () => ({
            to: '/customer/*/parkingLots/viewLot/11111'
        })
    }),
    useParams: () => ({
        customerId: '123',
    })
}));

describe('Add Vehicle/Asset page render', () => {
    it('Should render with loader', () => {
        const result = renderWithClient(<VehiclManagement />);
        expect(result.container.querySelector('.loader')).toBeInTheDocument();
    });

    it('Should render no data message', async () => {
        const result = renderWithClient(<VehiclManagement />);
        await waitFor(async () => {
            const noData = await result.container.querySelector('.nodata');
            expect(noData).toBeInTheDocument();
        });
    });
});
