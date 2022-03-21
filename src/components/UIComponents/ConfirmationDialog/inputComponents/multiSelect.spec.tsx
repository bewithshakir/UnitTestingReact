import { shallow } from 'enzyme';
import MultiSelectComponent from './multiSelect';


const mockFormik = {
    touched: {},
    error: "",
    errors: {},
    initialError: "",
    initialTouched: false,
    initialValue: "",
    values: {},
    getFieldProps: jest.fn(),
    setFieldValue: jest.fn()
};

describe('renders inputText properly', () => {
    const onChange = jest.fn();
    const handleTouch = jest.fn();
    const inputComponent = shallow(
        <MultiSelectComponent field={{
            fieldType: 'multiSelect',
            name: 'city',
            label: 'Select City',
            options: [{ value: "a", label: 'a' }, { value: 'b', label: 'b' }]
        }}
            fieldId={`multiSelect`}
            formik={mockFormik as any}
            onChange={onChange}
            handleTouched={handleTouch}
        />);

    it('snapshot testing', () => {
        expect(inputComponent).toMatchSnapshot();
    });
});
