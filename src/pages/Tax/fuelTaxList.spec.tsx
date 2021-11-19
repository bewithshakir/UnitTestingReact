/* eslint-disable no-console */
import { shallow } from 'enzyme';
import TaxModel from '../../models/TaxModel';
import ActionsMenu from '../../components/UIComponents/Menu/ActionsMenu.component';

describe('Given Bruger Menu on FuelTax Landing Page', () => {
    const TaxObj = new TaxModel();
    const massActionOptions = TaxObj.massActions();

    test('Render Bruger Menu', () => {
        const FuelTaxBurgerMenu = shallow(
            <ActionsMenu
                options={massActionOptions}
                onSelect={() => jest.fn()}
            />
        );
        expect(FuelTaxBurgerMenu).toMatchSnapshot();
    });


    test('Bruger Menu Menu With Options', () => {
        const FuelTaxBurgerMenu = shallow(
            <ActionsMenu
                options={massActionOptions}
                onSelect={() => jest.fn()}
            />
        );
        FuelTaxBurgerMenu.find(".btn-listmemu").simulate('click');
        expect(FuelTaxBurgerMenu.find(".btn-listmemu").hasClass('active')).toBe(true);
        expect(FuelTaxBurgerMenu.find('.actions-popper').exists()).toBe(true);
    });

});

