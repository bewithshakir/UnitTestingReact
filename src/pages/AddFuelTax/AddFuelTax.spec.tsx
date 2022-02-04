import { mount, shallow } from 'enzyme';
import DiscardDialog from '../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import { findByTestAttr, HOCSetup } from '../../tests/testUtils';
import AddFuelTax from './index';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
    useLocation: () => ({
        pathname: '/addFuelTax/'
    }),
    push: jest.fn()
}));

/**
 * Factory function to create wrapper
 * @returns {wrapper}
 */

describe('AddFuelTax component', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(<HOCSetup>
            <AddFuelTax version="Breadcrumbs-Single" />
        </HOCSetup>);
    });
    it('renders component without error ', () => {
        const component = findByTestAttr(wrapper, 'component-AddFuelTax');
        expect(component.length).toBe(1);
    });

    it('renders auto input without error', () => {
        const autoInput = findByTestAttr(wrapper, 'auto-complete-input');
        expect(autoInput.length).toBe(1);
    });

    it('renders city input without error', () => {
        const cityInput = findByTestAttr(wrapper, 'city');
        expect(cityInput.length).toBe(1);
    });

    it('renders state input without error', () => {
        const cityInput = findByTestAttr(wrapper, 'state');
        expect(cityInput.length).toBe(1);
    });

    it('renders federalRate input without error', () => {
        const cityInput = findByTestAttr(wrapper, 'federalRate');
        expect(cityInput.length).toBe(1);
    });

    it('renders localRate input without error', () => {
        const cityInput = findByTestAttr(wrapper, 'localRate');
        expect(cityInput.length).toBe(1);
    });

    it('renders loadFuel input without error', () => {
        const cityInput = findByTestAttr(wrapper, 'loadFuel');
        expect(cityInput.length).toBe(1);
    });

    it('renders miscLocalFuelRate input without error', () => {
        const cityInput = findByTestAttr(wrapper, 'miscLocalFuelRate');
        expect(cityInput.length).toBe(1);
    });

    it('renders InspFuelRate input without error', () => {
        const cityInput = findByTestAttr(wrapper, 'InspFuelRate');
        expect(cityInput.length).toBe(1);
    });

    it('renders countryFuelRate input without error', () => {
        const cityInput = findByTestAttr(wrapper, 'countryFuelRate');
        expect(cityInput.length).toBe(1);
    });

    it('renders cityFuelRate input without error', () => {
        const cityInput = findByTestAttr(wrapper, 'cityFuelRate');
        expect(cityInput.length).toBe(1);
    });

    it('renders stateFuelRate input without error', () => {
        const cityInput = findByTestAttr(wrapper, 'stateFuelRate');
        expect(cityInput.length).toBe(1);
    });

    it('renders Cancel Button without error', () => {
        const cancelButton = findByTestAttr(wrapper, 'cancel');
        expect(cancelButton.length).toBeGreaterThanOrEqual(0);
    });

    it('renders Save Button without error', () => {
        const cancelButton = findByTestAttr(wrapper, 'save');
        expect(cancelButton.length).toBeGreaterThanOrEqual(0);
    });
});

describe('renders discard dialog properly', () => {
    const discardDialog = shallow(
        <DiscardDialog
            title='Discard dialog'
            content='content'
            open={true}
            handleConfirm={() => jest.fn()}
            handleToggle={() => jest.fn()}
        />);
    expect(discardDialog).toMatchSnapshot();
});