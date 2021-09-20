import { shallow } from 'enzyme';
import Select from './dropdown';


describe('renders the Select component', () => {
    const component = shallow(<Select label='Input' items={[{label:'Label', value: 'Value'}]} onChange={() => {}}/>);

    it('snapshot test', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the Select with search component', () => {
    const component = shallow(<Select label='Input' items={[{ label: 'Label', value: 'Value' }]} search onChange={() => { }} />);

    it('snapshot test', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the MultiSelect component', () => {
    const component = shallow(<Select label='Input' items={[{ label: 'Label1', value: 'Value1' }, { label: 'Label2', value: 'Value2' }, { label: 'Label3', value: 'Value3' }]} multiple onChange={() => { }} />);

    it('snapshot test', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the MultiSelect with search component', () => {
    const component = shallow(<Select label='Input' items={[{ label: 'Label1', value: 'Value1' }, { label: 'Label2', value: 'Value2' }, { label: 'Label3', value: 'Value3' }]} multiple search onChange={() => { }} />);

    it('snapshot test', () => {
        expect(component).toMatchSnapshot();
    });
});
