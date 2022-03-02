import { waitFor } from '@testing-library/react';
import { headerObj } from '../../components/UIComponents/DataGird/grid.component';
import { renderWithClient } from '../../tests/utils';
import InnerTable from './SubTableTanks';

const headCellsLots: headerObj[] = [
    { field: "tcsRegisterId", label: "TANK REGISTER ID", type: 'text', width: '300' },
    { field: "product", label: "FUEL TYPE", type: 'product' },
    { field: "maxCapacityVol", label: "MAX CAPACITY", type: 'text' },
    { field: "lastRefuelDatetime", label: "LAST REFUEL ON", type: 'text' },
    { field: "currentWetstock", label: "CURRENT WETSTOCK", type: 'text' },
    { field: "lastTransactionDatetime", label: "LAST TRANSACTION ON", type: 'text' },
    { field: "volumeDispensed", label: "SUM OF VOLUME DISPENSED", type: 'text' },
    { field: "billNumber", label: "BILL OF LEADING NUMBER", type: 'text' },
];


describe('renders Tanks grid component', () => {
    it('renders  TruckLanding page component with all ui components', () => {
        const result = renderWithClient(<InnerTable primaryKey='id' id='666' headCells={headCellsLots} tanksDataModel={(obj) => obj} />);
        const grid = result.getByText('TANK REGISTER ID');
        expect(grid).toBeInTheDocument();
    });
    it('render data on success response', async () => {
        const result = renderWithClient(<InnerTable primaryKey='id' id='666' headCells={headCellsLots} tanksDataModel={(obj) => obj} />);
        await waitFor(() => {
            expect(result.getByText(/2323/i)).toBeInTheDocument();
        });

    });
});