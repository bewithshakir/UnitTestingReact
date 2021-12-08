import { shallow } from 'enzyme';
import GridComponent from "./grid.component";


describe('renders the Default Data Grid component', () => {
    const component = shallow(<GridComponent
        primaryKey={'taxJurisdictionId'}
        rows={[
            { col1: 'row-1-col-1', col2: 'row-1-col-2', col3: 'row-1-col-3', col4: 'row-1-col-4' },
            { col1: 'row-2-col-1', col2: 'row-2-col-2', col3: 'row-2-col-3', col4: 'row-2-col-4' },
            { col1: 'row-3-col-1', col2: 'row-3-col-2', col3: 'row-3-col-3', col4: 'row-3-col-4' },
            { col1: 'row-4-col-1', col2: 'row-4-col-2', col3: 'row-4-col-3', col4: 'row-4-col-4' },
        ]}
        header={[
            { field: "col1", label: "COL-1", type: 'text', align: 'left' },
            { field: "col2", label: "COL-2", type: 'text', align: 'left' },
            { field: "col3", label: "COL-3", type: 'text', align: 'left' },
            { field: "col4", label: "COL-4", type: 'text', align: 'left' },
        ]}
        isLoading={false}
        enableRowSelection={false}
        enableRowAction={false}
        getPages={jest.fn()}
        searchTerm=""
        openDrawer={jest.fn()}
        noDataMsg='Add New Data by clicking on the "Add" button.'
        getId={jest.fn()}
        resetCollaps={false}
        onResetTableCollaps={jest.fn()}
    />);

    it('snapshot test for Default Data Grid component', () => {
        expect(component).toMatchSnapshot();
    });

});
