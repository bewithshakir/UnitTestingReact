import * as React from 'react';
import VehicleRuleManagementLandingContent from './index';
import { renderWithClient } from '../../tests/utils';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate
}));
describe('Rendering of Vehicle Rule landing page Component', () => {
    it('Check mocked API response render', async () => {
        const component = renderWithClient(<VehicleRuleManagementLandingContent version='Breadcrumbs-Many' />);
        await waitFor(() => {
            const foundRows = component.getAllByText('Culpeper');
            expect(foundRows.length).not.toBe(0);
        });

    });

});

describe('Given Sortby Menu on Vehicle Rule landing Page', () => {
    test('Sortby Menu Menu With Options', async () => {
        const component = renderWithClient(<VehicleRuleManagementLandingContent version='Breadcrumbs-Many' />);
        const sortButton = component.container.querySelector('.btn-sortby') as HTMLButtonElement;
        expect(sortButton).toBeInTheDocument();
        userEvent.click(sortButton);
        await waitFor(() => {
            expect(component.container.querySelector('.btn-sortby.active')).toBeInTheDocument();
            expect(component.container.querySelector('.sortby-popper')).toBeInTheDocument();
        });
    });
});
