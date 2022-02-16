import { mount } from 'enzyme';
import * as ReactQuery from 'react-query';
import OpisRackSegment from './OpisRackSegment';
const queryClient = new ReactQuery.QueryClient();
// import Select from '../../components/UIComponents/Select/SingleSelect';

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//    ...jest.requireActual('react-router-dom') as any,
//   useNavigate: () => mockedUsedNavigate,
// }));


describe('Rendering of Add product Parking lot', () => {
    it('Add product snapshot testing overall', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <OpisRackSegment isDisabled={false} formik={{}} editMode={false} fetchTaxList={false} showFuelTaxError={jest.fn()} setFetchTaxList={jest.fn()} /> </ReactQuery.QueryClientProvider >);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});

afterAll(() => {
    jest.useRealTimers();
});
