import { shallow } from 'enzyme';
import SelectComponent from './select';


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
        <SelectComponent field={{
            fieldType: 'singleSelect',
            name: 'city',
            label: 'Select City',
            options: [{ value: "a", label: 'a' }, { value: 'b', label: 'b' }]
        }}
            fieldId={`select`}
            formik={mockFormik as any}
            onChange={onChange}
            handleTouched={handleTouch}
        />);

    it('snapshot testing', () => {
        expect(inputComponent).toMatchSnapshot();
    });
});
