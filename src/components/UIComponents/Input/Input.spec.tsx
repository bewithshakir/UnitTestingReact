import { shallow } from 'enzyme';
import Input from './Input';


describe('renders the default Input component', () => {
    const component = shallow(<Input label='Input' />);

    it('snapshot test for default Input', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the Input component disabled', () => {
    const component = shallow(<Input label='Input' disabled/>);

    it('snapshot test for Input component disabled', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the Input component required', () => {
    const component = shallow(<Input label='Input' required />);

    it('snapshot test for Input component required', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the Input component error and helpertext', () => {
    const component = shallow(<Input label='Input' error helperText='Error' />);

    it('snapshot test for Input component with error and helpertext', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('renders the Input component with helpertext', () => {
    const component = shallow(<Input label='Input' helperText='Message' />);

    it('snapshot test for Input component with helpertext', () => {
        expect(component).toMatchSnapshot();
    });
});