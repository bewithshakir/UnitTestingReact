import { shallow } from 'enzyme';
import InputText from './inputText';


const mockFormik = {
    touched: {},
    error: "",
    errors: {},
    initialError: "",
    initialTouched: false,
    initialValue: "",
    values: {
        text: '',
    },
    getFieldProps: jest.fn(),
    setFieldValue: jest.fn()
};

describe('renders inputText properly', () => {
    const onChange = jest.fn();
    const handleTouch = jest.fn();
    const inputComponent = shallow(
        <InputText field={{
            fieldType: 'text',
            name: 'text',
            label: 'Enter Name',
        }}
            fieldId={`textInput`}
            formik={mockFormik as any}
            onChange={onChange}
            handleTouched={handleTouch}
        />);

    it('snapshot testing', () => {
        expect(inputComponent).toMatchSnapshot();
    });
});
