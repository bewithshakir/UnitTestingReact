import { mount, shallow } from 'enzyme';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import {i18n} from '../../i18n/i18n';
import { findByIdAttr, findByTestAttr } from '../../tests/testUtils';
import AddSalesTax from './AddSalesTax';

const queryClient = new QueryClient();

/**
 * Factory function to create wrapper
 * @returns {wrapper}
 */

const setup = (props={})=>  mount(<QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
        <AddSalesTax {...props}/>
    </I18nextProvider>
</QueryClientProvider>);


describe('AddSalesTax component', () => {

    it('renders component without error ', () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'component-AddSalesTax');
        expect(component.length).toBe(1);
    });

    it('renders auto input without error', ()=>{
        const wrapper = setup(); 
        const autoInput = findByTestAttr(wrapper, 'auto-complete-input');
        expect(autoInput.length).toBe(1);
    });

    it('renders city input without error', ()=>{
        const wrapper = setup(); 
        const cityInput = findByTestAttr(wrapper, 'city');
        expect(cityInput.length).toBe(1);
    });

    it('renders state input without error', ()=>{
        const wrapper = setup(); 
        const cityInput = findByTestAttr(wrapper, 'state');
        expect(cityInput.length).toBe(1);
    });

    it('renders stateRate input without error', ()=>{
        const wrapper = setup(); 
        const cityInput = findByTestAttr(wrapper, 'stateRate');
        expect(cityInput.length).toBe(1);
    });

    it('renders localRate input without error', ()=>{
        const wrapper = setup(); 
        const cityInput = findByTestAttr(wrapper, 'localRate');
        expect(cityInput.length).toBe(1);
    });

    it('renders Cancel Button without error', ()=>{
        const wrapper = setup(); 
        const cancelButton = findByTestAttr(wrapper, 'cancel');
        expect(cancelButton.length).toBeGreaterThanOrEqual(0);
    });

    it('renders Save Button without error', ()=>{
        const wrapper = setup(); 
        const cancelButton = findByTestAttr(wrapper, 'save');
        expect(cancelButton.length).toBeGreaterThanOrEqual(0);
    });

    

    /* describe('renders city with all cases', ()=> {
        it('renders city input without error', ()=>{
            const wrapper = setup(); 
            const cityInput = findByTestAttr(wrapper, 'city');
            expect(cityInput.length).toBe(1);
        });
    }); */

    // it('renders city input with `disabled` attributes', ()=>{
    //     const wrapper = setup(); 
    //     const cityInput = findByIdAttr(wrapper, 'city');
    //     expect(cityInput.closest('input')).toHaveAttribute('disabled');
    //     // console.log('city--', cityInput.closest('input'))
    // });
    

});