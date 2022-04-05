import * as Yup from 'yup';

const selectOption = Yup.object().shape({
    label: Yup.string().required('Required'),
    value: Yup.string().required('Required'),
}).required('Required');

const getAlphaNumScehma = (charLength?: number, lengthType?: 'max' | 'length') => {
    const stringSchema = Yup.string().matches(/^[a-z0-9]+$/i, 'Invalid').required('Required');
    switch (lengthType) {
        case 'length':
            stringSchema.length(charLength || 0);
            return stringSchema;
        case 'max':
            stringSchema.max(charLength || 0);
            return stringSchema;
        default:
            return stringSchema;
    }
};

interface SelectSchemaOptions {
    validateOnField: string
    fieldValue: any
    isMultiSelect?: boolean
}

const conditionalSelectSchema = ({
    validateOnField,
    fieldValue,
    isMultiSelect }: SelectSchemaOptions) => Yup.mixed().test(
        validateOnField,
        function (value: any, context: any) {
            const isFieldValid = isMultiSelect ? value.length === 0 : !value?.value;
            return context.parent[validateOnField] === fieldValue &&
                isFieldValid ?
                this.createError({ message: 'Required' }) :
                true;
        }
    );


export const AddVehicleValidationSchema = Yup.object().shape({
    isApplyRule: Yup.boolean(),
    isAsset: Yup.boolean().required('Required'),

    /** Vehicle section */
    vehicleType: conditionalSelectSchema({ validateOnField: 'isAsset', fieldValue: false }),
    licenceNo: Yup.string().when('isAsset', {
        is: false,
        then: getAlphaNumScehma(10, 'max')
    }),
    vin: Yup.string().when('isAsset', {
        is: false,
        then: getAlphaNumScehma(17, 'length')
    }),
    year: Yup.string().when('isAsset', {
        is: false,
        then: Yup.string().matches(/^\d{4}$/, 'Year should be a 4 digits number').required('Required')
    }),
    make: Yup.string().when('isAsset', {
        is: false,
        then: getAlphaNumScehma(15, 'max')
    }),
    model: Yup.string().when('isAsset', {
        is: false,
        then: getAlphaNumScehma(15, 'max')
    }),
    color: conditionalSelectSchema({ validateOnField: 'isAsset', fieldValue: false }),

    /** Asset section */
    assetType: conditionalSelectSchema({ validateOnField: 'isAsset', fieldValue: true }),
    assetId: Yup.string().when('isAsset', {
        is: true,
        then: getAlphaNumScehma()
    }),
    assetNote: Yup.string(),

    fuelProductName: selectOption,
    fuelCustomProductName: selectOption,

    isNonFuel: Yup.boolean().required('Required'),
    nonFuelCustomProductName: conditionalSelectSchema({ validateOnField: 'isNonFuel', fieldValue: true, isMultiSelect: true }),

    isAddOn: Yup.boolean().required('Required'),
    addOnCustomProductName: conditionalSelectSchema({ validateOnField: 'isAddOn', fieldValue: true, isMultiSelect: true }),
});
