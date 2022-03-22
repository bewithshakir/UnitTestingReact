import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithClient } from "../../../../tests/utils";
import { FilterDialogField } from "../config";
import SelectDynamic from "./selectDynamic";

afterEach(cleanup);

const field: FilterDialogField = {
    name: 'city',
    label: 'Select city',
    required: true,
    fieldType: 'singleSelect',
    apiUrl: '/api/customer-service/lots/filter-options',
    responseFormatter: (data: any) => {
        return data?.cities?.map((item: any) => ({
            label: item, value: item
        })) || [];
    },
    extraApiParams: { countryCode: 'us' },
    placeHolder: 'Select City',
};

const mockFormik: any = {
    touched: {},
    errors: {},
    initialTouched: {},
    initialValues: { city: { label: '', value: '' } },
    values: { city: { label: '', value: '' } },
    getFieldProps: jest.fn(),
    setFieldValue: jest.fn(),
    getFieldHelpers: jest.fn(),
    setFieldTouched: jest.fn(),
    isSubmitting: false,
    isValidating: false,
    submitCount: 0

};
describe('Select Dynamic component', () => {

    it('Should render with placeholder', async () => {
        const onChangeSpy = jest.fn();
        const touchMock = jest.fn();
        const result = renderWithClient(<SelectDynamic
            field={field} fieldId="selectCityDynamic"
            formik={mockFormik} onChange={onChangeSpy}
            handleTouched={touchMock}
        />
        );
        const dropdowns = await result.findByText('Select City');
        expect(dropdowns).toBeDefined();

    });
    it('Should call onBlur', async () => {
        const onChangeSpy = jest.fn();
        const onBlurSpy = jest.fn();
        const { container } = renderWithClient(<SelectDynamic
            field={field} fieldId="selectCityDynamic"
            formik={mockFormik} onChange={onChangeSpy}
            handleTouched={onBlurSpy}
        />
        );
        const query = container.querySelector('input');
        fireEvent.blur(query!);
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
});
