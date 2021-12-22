/* eslint-disable no-console */
import Select from './SingleSelect';
// import { YellowFuelIcon } from '../../../assets/icons';
import { shallow, mount } from 'enzyme';
import { getProductIcon } from '../../../utils/helperFunctions';

describe('renders the Default Select component', () => {
    const component = shallow(<Select label='Input' items={[{ label: 'Label', value: 'Value', icon: getProductIcon('Yellow') }]} onChange={() => jest.fn()} />);

    it('snapshot test for Default Select component', () => {
        expect(component).toMatchSnapshot();
    });

});

describe('renders the SingleSelect component with values', () => {
    const component = shallow(<Select label='Input' value={{ label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') }} items={[{ label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') }, { label: 'Label2', value: 'Value2', icon: getProductIcon('Yellow') }, { label: 'Label3', value: 'Value3', icon: getProductIcon('Yellow') }]} onChange={() => jest.fn()} />);

    it('Snapshot test for the SingleSelect component ', () => {
        expect(component).toMatchSnapshot();
    });
});


describe('renders the SingleSelect component with error ', () => {
    const component = shallow(<Select label='Input' error={true} value={{ label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') }} items={[{ label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') }, { label: 'Label2', value: 'Value2', icon: getProductIcon('Yellow') }, { label: 'Label3', value: 'Value3', icon: getProductIcon('Yellow') }]} onChange={() => jest.fn()} />);

    it('snapshot test for the SingleSelect component ', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the SingleSelect component with required prop', () => {
    const component = shallow(<Select label='Input' required value={{ label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') }} items={[{ label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') }, { label: 'Label2', value: 'Value2', icon: getProductIcon('Yellow') }, { label: 'Label3', value: 'Value3', icon: getProductIcon('Yellow') }]} onChange={() => jest.fn()} />);

    it('snapshot test for the SingleSelect component ', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the SingleSelect component with helper text', () => {
    const component = shallow(<Select label='Input' required helperText={'sample error'} value={{ label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') }} items={[{ label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') }, { label: 'Label2', value: 'Value2', icon: getProductIcon('Yellow') }, { label: 'Label3', value: 'Value3', icon: getProductIcon('Yellow') }]} onChange={() => jest.fn()} />);

    it('snapshot test for the SingleSelect component ', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the SingleSelect component on change', () => {
    it('Should change value when onChange was called', () => {
        const props = {
            label: 'Select values',
            onChange: jest.fn(),
            id: 'single-select-on-change-test',
            items: [{ label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') }, { label: 'Label2', value: 'Value2', icon: getProductIcon('Yellow') }, { label: 'Label3', value: 'Value3', icon: getProductIcon('Yellow') }]
        };
        const wrapper = mount(<Select {...props} />);
        const event = { label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') };
        wrapper.find('Select').simulate('change', event);
        expect(wrapper).toMatchSnapshot();
    });
});


describe('renders the SingleSelect component with correct no of options', () => {
    it('Should render correct list of options', () => {
        const options = [{ label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') }, { label: 'Label2', value: 'Value2', icon: getProductIcon('Yellow') }];
        const props = {
            label: 'Select values',
            onChange: jest.fn(),
            id: 'single-select',
            items: options
        };
        const wrapper = mount(<Select {...props} />);
        wrapper.find('div.react-select__indicator').simulate('mouseDown', { button: 0 });
        expect(wrapper.find('div.react-select__option').length).toEqual(options.length);
    });
});

describe('renders the SingleSelect component with any option selected', () => {
    it('Should render correct text in value', () => {
        const options = [{ label: 'Label1', value: 'Value1', icon: getProductIcon('Yellow') }, { label: 'Label2', value: 'Value2', icon: getProductIcon('Yellow') }, { label: 'Label3', value: 'Value3', icon: getProductIcon('Yellow') }];
        const randomNumber = Math.floor(Math.random() * ((options.length - 1) - 0 + 1)) + 0;
        const props = {
            label: 'Select values',
            onChange: jest.fn(),
            id: 'single-select-options-check',
            items: options
        };
        const wrapper = mount(<Select {...props} />);
        wrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
        wrapper.find('div.react-select__option').at(randomNumber).simulate('click', null);
        expect(wrapper.find('h4').text()).toEqual(options[randomNumber].label);
    });
});
