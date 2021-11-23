import Select from './SingleSelect';
import { shallow } from 'enzyme';

describe('renders the Default Select component', () => {
    const component = shallow(<Select label='Input' id='input' items={[{label:'Label', value: 'Value'}]} onChange={() => jest.fn()}/>);

    it('snapshot test for Default Select component', () => {
        expect(component).toMatchSnapshot();
    });

});

