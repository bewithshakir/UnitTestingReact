import * as Yup from 'yup';

export const AddVehicleRuleValidationSchema = Yup.object().shape({
    addressLine1: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
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
