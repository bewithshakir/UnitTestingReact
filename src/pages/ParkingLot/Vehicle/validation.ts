import * as Yup from 'yup';

const selectOption = Yup.object().shape({
    label: Yup.string().required('Required'),
    value: Yup.string().required('Required'),
}).required('Required');

const getMaxAlphaNumScehma = (maxChar: number) => {
    return Yup.string().matches(/^[a-z0-9]+$/i, 'Invalid').max(maxChar).required('Required');
};

export const AddVehicleValidationSchema = Yup.object().shape({
    isApplyRule: Yup.boolean(),
    isAsset: Yup.boolean().required('Required'),
    vehicleType: selectOption,

    /** Vehicle section */
    licenceNo: getMaxAlphaNumScehma(10),
    vin: Yup.string().matches(/^[a-z0-9]+$/i, 'Invalid').length(17).required('Required'),
    year: Yup.string().matches(/^\d{4}$/, 'Year should be a 4 digits number').required('Required'),
    make: getMaxAlphaNumScehma(15),
    model: getMaxAlphaNumScehma(15),
    color: selectOption,
    fuelProductName: selectOption,
    fuelCustomProductName: selectOption,

    isNonFuel: Yup.boolean().required('Required'),
    nonFuelCustomProductName: Yup.array().test('isNonFuel', function (value: any, context: any) {
        if (context.parent.isNonFuel && value.length === 0) {
            return this.createError({ message: 'Required' });
        }
        return true;
    }),

    isAddOn: Yup.boolean().required('Required'),
    addOnCustomProductName: Yup.array().test('isAddOn', function (value: any, context: any) {
        if (context.parent.isAddOn && value.length === 0) {
            return this.createError({ message: 'Required' });
        }
        return true;
    }),

});
