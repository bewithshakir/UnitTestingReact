import { waitFor,screen } from '@testing-library/react';
import { renderWithClient } from '../../tests/utils';
import UserLandingPage from './index';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

describe('Rendering of User Landing Component', () => {
    it('check user landing page DOM', async () => {
        const result = renderWithClient(<UserLandingPage version="NavLinks" />);
        await waitFor(() => {
            expect(result.container.querySelector('#usersFilter')).toBeInTheDocument();
            expect(result.container.querySelector('#userSort')).toBeInTheDocument();
            expect(result.container.querySelector('#usersSearch')).toBeInTheDocument();
        });
    });
});

describe('tests User landing page', () => {
    it('test load data in grid using mock api', async () => {
        const result = renderWithClient(<UserLandingPage version="NavLinks" />);
        await waitFor(() => {
            expect(result.getByText(/abc123@bacancy.com/i)).toBeInTheDocument();
        });
    });
});

function getAllElements (component: any) {
    const sortBy = component.container.querySelector('#userSort');
    const searchElem = component.container.querySelector('#usersSearch') as HTMLInputElement;
    return { sortBy, searchElem };
}

describe('sortby user name on users landing page', () => {
    it('sort options on page load', async () => {
        const result = renderWithClient(<UserLandingPage version="Breadcrumbs-Many" />);
        const { sortBy } = getAllElements(result);
        userEvent.click(sortBy);

        await waitFor(() => {
            expect(result.getByText(/users_atoz/i)).toBeInTheDocument();
            expect(result.getByText(/users_ztoa/i)).toBeInTheDocument();
        });
    });
    
    it('perform users sorting', async () => {
        const result = renderWithClient(<UserLandingPage version="Breadcrumbs-Many" />);
        const { sortBy } = getAllElements(result);
        userEvent.click(sortBy);
        userEvent.click(await screen.findByText('user.sortBy.users_atoz'));
        await waitFor(() => {
            expect(result.getByText(/dsp@shell.com/i)).toBeInTheDocument();
        });
    });
});

it('search truck parking lot with success', async () => {
    const result = renderWithClient(<UserLandingPage version="Breadcrumbs-Single" />);
    const { searchElem } = getAllElements(result);
    fireEvent.change(searchElem, { target: { value: 'Users Info Data' } });

    await waitFor(() => {
        expect(result.getByText(/Victor/i)).toBeInTheDocument();
    });
});
it('search truck parking lot with no data found', async () => {
    const result = renderWithClient(<UserLandingPage version="Breadcrumbs-Single" />);
    const { searchElem } = getAllElements(result);
    fireEvent.change(searchElem, { target: { value: 'Users Data' } });

    await waitFor(() => {
        expect(result.getByText(/No Results Found/i)).toBeInTheDocument();
    });
});
