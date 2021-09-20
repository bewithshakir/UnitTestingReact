import { shallow } from 'enzyme';
import Input from './Input';


describe('renders the Input component', () => {
    const component = shallow(<Input label='Input' />);

    it('snapshot test', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the Input component disabled', () => {
    const component = shallow(<Input label='Input' disabled/>);

    it('snapshot test', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the Input component required', () => {
    const component = shallow(<Input label='Input' required />);

    it('snapshot test', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the Input component error helpertext', () => {
    const component = shallow(<Input label='Input' error helperText='Error' />);

    it('snapshot test', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the Input component  helpertext', () => {
    const component = shallow(<Input label='Input' helperText='Message' />);

    it('snapshot test', () => {
        expect(component).toMatchSnapshot();
    });
});