import * as Yup from 'yup';

export const AddUserSchema = Yup.object().shape({
    userGroup: Yup.object().shape({
        label: Yup.string().required('Required'), value: Yup.string().required('Required')
    }).required('Required'),
    dsp: Yup.object()
        .nullable()
        .test('userGroup', function (value: any, context: any) {
            if (context?.parent?.userGroup?.label?.toLowerCase() === 'dsp') {
                if (!value || !value.value) {
                    return this.createError({
                        message: { label: 'Required', value: 'Required' },
                    });
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }),
    email: Yup.string().email('Invalid email')
        .max(100, 'Email should be less then or equal to 100 characters.')
        .required('Required'),
    userName: Yup.string().required('Required'),
    phone: Yup.string().matches(
        /^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
        'Invalid phone number'
    ),
    userAccessLevel: Yup.string().required('Required'),
});

