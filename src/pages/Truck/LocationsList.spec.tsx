import { waitFor } from '@testing-library/react';
import { headerObj } from '../../components/UIComponents/DataGird/grid.component';
import { renderWithClient } from '../../tests/utils';
import InnerTable from './SubTableLocations';

const headCellsLots: headerObj[] = [
        { field: "name", label: "TRUCK PARKING LOT NAME", type: 'text' },
        { field: "address", label: "ADDRESS", type: 'text' },
        { field: "state", label: "STATE", type: 'text' },
        { field: "city", label: "CITY", type: 'text' },
        { field: "postalcode", label: "POSTAL CODE", type: 'text' },
    ];


describe('renders Locations grid component', ()=> {
    it('renders  TruckLanding page component with all ui components', ()=> {
        const result = renderWithClient(<InnerTable primaryKey='id' id='a8898131-5add-4b76-aa92-8c7521bcb829' headCells={headCellsLots}/>);
        const grid = result.getByText('TRUCK PARKING LOT NAME');
        expect(grid).toBeInTheDocument();
    });
    it('render data on success response', async ()=> {
        const result = renderWithClient(<InnerTable primaryKey='id' id='a8898131-5add-4b76-aa92-8c7521bcb829' headCells={headCellsLots} />);
        await waitFor(()=> {
            expect(result.getByText(/Fort Washington/i)).toBeInTheDocument();
        });
        
    },5000);
});