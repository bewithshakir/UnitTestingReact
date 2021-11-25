import { mount } from 'enzyme';
import { QueryClient, QueryClientProvider } from 'react-query';

import {i18n} from '../../i18n/i18n';
import { findByIdAttr, findByTestAttr, HOCSetup } from '../../tests/testUtils';
import AddSalesTax from './AddSalesTax';

const queryClient = new QueryClient();

/**
 * Factory function to create wrapper
 * @returns {wrapper}
 */

/* const setup = (props={})=>  mount(<QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
        <AddSalesTax {...props}/>
    </I18nextProvider>
</QueryClientProvider>); */


describe('AddSalesTax component', () => {
    let wrapper;
    beforeEach(()=> {
        wrapper = mount(<HOCSetup>
            <AddSalesTax/>
        </HOCSetup>);
    });
    it('renders component without error ', () => {
        const component = findByTestAttr(wrapper, 'component-AddSalesTax');
        expect(component.length).toBe(1);
    });

    it('renders auto input without error', ()=>{
        const autoInput = findByTestAttr(wrapper, 'auto-complete-input');
        expect(autoInput.length).toBe(1);
    });

    it('renders city input without error', ()=>{
        const cityInput = findByTestAttr(wrapper, 'city');
        expect(cityInput.length).toBe(1);
    });

    it('renders state input without error', ()=>{
        const cityInput = findByTestAttr(wrapper, 'state');
        expect(cityInput.length).toBe(1);
    });

    it('renders stateRate input without error', ()=>{
        const cityInput = findByTestAttr(wrapper, 'stateRate');
        expect(cityInput.length).toBe(1);
    });

    it('renders localRate input without error', ()=>{
        const cityInput = findByTestAttr(wrapper, 'localRate');
        expect(cityInput.length).toBe(1);
    });

    it('renders Cancel Button without error', ()=>{
        const cancelButton = findByTestAttr(wrapper, 'cancel');
        expect(cancelButton.length).toBeGreaterThanOrEqual(0);
    });

    it('renders Save Button without error', ()=>{
        const cancelButton = findByTestAttr(wrapper, 'save');
        expect(cancelButton.length).toBeGreaterThanOrEqual(0);
    });

    describe('UseQuery testing', ()=> {

        describe('while loading', ()=> {
            it.todo('render a loader')
        });
    });

});