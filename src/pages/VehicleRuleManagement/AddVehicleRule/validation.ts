import * as Yup from 'yup';

export const AddVehicleRuleValidationSchema = Yup.object().shape({
    addressLine1: Yup.string().required('Required'),
    state: Yup.string().matches(/^.{1,50}$/, 'Invalid State.').required('Required'),
    city: Yup.string().matches(/^.{1,50}$/, 'Invalid City.').required('Required'),
    status: Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required'),
    year: Yup.string().matches(/^\d{4}$/, 'Invalid Year.').required('Required'),
    product: Yup.array()
        .test('product', function (value: any) {
                if (!value || (value && value.length === 0)) {
                    return this.createError({
                        message: 'Required',
                    });
                } else {
                    return true;
                }
            
        })
});


export const EditVehicleRuleValidationSchema = Yup.object().shape({
    addressLine1: Yup.string().nullable(),
    state: Yup.string().matches(/^.{1,50}$/, 'Invalid State.').required('Required'),
    city: Yup.string().matches(/^.{1,50}$/, 'Invalid City.').required('Required'),
    status: Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required'),
    year: Yup.string().matches(/^\d{4}$/, 'Invalid Year.').required('Required'),
    product: Yup.array()
        .test('product', function (value: any) {
            if (!value || (value && value.length === 0)) {
                return this.createError({
                    message: 'Required',
                });
            } else {
                return true;
            }

        })
});