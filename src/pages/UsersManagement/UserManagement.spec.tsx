import { waitFor } from '@testing-library/react';
import { renderWithClient } from '../../tests/utils';
import UserLandingPage from './index';


describe('Rendering of User Landing Component', () => {
    it('check user landing page DOM', async () => {
        const result = renderWithClient(<UserLandingPage version="NavLinks" />);
        await waitFor(() => {
            expect(result.container.querySelector('#usersFilter')).toBeInTheDocument();
            expect(result.container.querySelector('#userSort')).toBeInTheDocument();
            expect(result.container.querySelector('#userSearch')).toBeInTheDocument();
        });
    });
});

describe('tests User landing page', () => {
    it('test load data in grid using mock api', async () => {
        const result = renderWithClient(<UserLandingPage version="NavLinks" />);
        await waitFor(() => {
            expect(result.getByText(/abc345@bacancy.com/i)).toBeInTheDocument();
        });
    });
});

