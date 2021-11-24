import Select from './MultiSelect';
import { YellowFuelIcon } from '../../../assets/icons';
import { shallow, mount } from 'enzyme';


describe('renders the MultiSelect component', () => {
    const component = shallow(<Select label='Input' id="multi-input" items={[{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}, { label: 'Label2', value: 'Value2', icon: <YellowFuelIcon/> }, { label: 'Label3', value: 'Value3', icon: <YellowFuelIcon/> }]} onChange={() => jest.fn()} />);

    it('snapshot test for the MultiSelect component ', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the MultiSelect component with values', () => {
    const component = shallow(<Select label='Input' id="multi-input" value={[]} items={[{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}, { label: 'Label2', value: 'Value2', icon: <YellowFuelIcon/> }, { label: 'Label3', value: 'Value3', icon: <YellowFuelIcon/> }]} onChange={() => jest.fn()} />);

    it('snapshot test for the MultiSelect component with values ', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the MultiSelect component with error', () => {
    const component = shallow(<Select label='Input' error={true} id="multi-input" value={[{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}]} items={[{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}, { label: 'Label2', value: 'Value2', icon: <YellowFuelIcon/> }, { label: 'Label3', value: 'Value3', icon: <YellowFuelIcon/> }]} onChange={() => jest.fn()} />);

    it('snapshot test for the MultiSelect component with error ', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the MultiSelect component with helper text', () => {
    const component = shallow(<Select label='Input' error={true} helperText={'sample error'} id="multi-input" value={[{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}]} items={[{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}, { label: 'Label2', value: 'Value2', icon: <YellowFuelIcon/> }, { label: 'Label3', value: 'Value3', icon: <YellowFuelIcon/> }]} onChange={() => jest.fn()} />);

    it('snapshot test for the MultiSelect component with helper text ', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the MultiSelect component with required prop', () => {
    const component = shallow(<Select label='Input' required id="multi-input" value={[{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}]} items={[{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}, { label: 'Label2', value: 'Value2', icon: <YellowFuelIcon/> }, { label: 'Label3', value: 'Value3', icon: <YellowFuelIcon/> }]} onChange={() => jest.fn()} />);

    it('snapshot test for the MultiSelect component with required prop ', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the MultiSelect component with no options', () => {
    const component = shallow(<Select label='Input' required id="multi-input" noOptionsMessage={"no data available"} value={[]} items={[]} onChange={() => jest.fn()} />);

    it('snapshot test for the MultiSelect component with no options ', () => {
        expect(component).toMatchSnapshot();
    });
});



describe('renders the MultiSelect component with loading', () => {
    const component = shallow(<Select label='Input' required id="multi-input" loadingMessage={'loading..'} value={null} items={null} onChange={() => jest.fn()} />);

    it('snapshot test for the MultiSelect component with loading ', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the MultiSelect component on change', () => {
    it('Should change value when onChange was called', () => {
        const props = {
            label: 'Select values',
            onChange: jest.fn(),
            id:'multi-select-on-change-test',
            items: [{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}, { label: 'Label2', value: 'Value2', icon: <YellowFuelIcon/> }, { label: 'Label3', value: 'Value3', icon: <YellowFuelIcon/> }]
        }
        const wrapper = mount(<Select {...props} />);
        const event = [{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}];
        wrapper.find('Select').simulate('change', event)
        expect(wrapper).toMatchSnapshot();
    });
});

describe('renders the MultiSelect component with correct no of options', () => {
    it('Should render correct list of options', () => {
        const options = [{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}, { label: 'Label2', value: 'Value2', icon: <YellowFuelIcon/> }];
        const props = {
            label: 'Select values',
            onChange: jest.fn(),
            id:'multi-select',
            items: options
        }
        const wrapper = mount(<Select {...props} />);
        wrapper.find('div.multi-select__dropdown-indicator').simulate('mouseDown', {button: 0 });
        expect(wrapper.find('div.multi-select__option').length).toEqual(options.length);
    });
});

describe('renders the MultiSelect component with more than 2 clicked options', () => {
    it('Should render correct option text in value', () => {
        const options = [{ label: 'Label1', value: 'Value1' , icon: <YellowFuelIcon/>}, { label: 'Label2', value: 'Value2', icon: <YellowFuelIcon/> }, { label: 'Label3', value: 'Value3', icon: <YellowFuelIcon/> }];
        const props = {
            label: 'Select values',
            onChange: jest.fn(),
            id:'multi-select-checkbox',
            items: options
        }
        const wrapper = mount(<Select {...props} />);
        wrapper.find('div.multi-select__dropdown-indicator').simulate('mouseDown', {button: 0 });
        wrapper.find('div.multi-select__option').forEach(c => c.simulate('click', null));
        expect(wrapper.find('div.option-label').text()).toEqual('Label1, Label2 and 1 more');
    });
});

