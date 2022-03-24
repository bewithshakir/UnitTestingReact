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
        /^(?:\+?1[-.●]?)?\(?([\d]{3})\)?[-.●]?([\d]{3})[-.●]?([\d]{4})$/,
        'Invalid phone number'
    ),
    userAccessLevel: Yup.string().required('Required'),
});

// Field level display Error Handler
export const isUserNameErrorExist = (formik: any) => !!(formik.touched.userName && formik.errors.userName);
export const isPhoneErrorExist = (formik: any) => !!(formik.touched.phone && formik.errors.phone);
export const isEmailErrorExist = (formik: any) => !!(formik.touched.email && formik.errors.email);
export const isUserGroupErrorExist = (formik: any) => !!(formik.touched.userGroup && formik.errors.userGroup);
export const isDSPErrorExist = (formik: any) => !!(formik.touched.dsp && formik.errors.dsp);

// Field level helper Taxt Error Handler
export const userNameHelperText = (formik: any) => isUserNameErrorExist(formik) ? formik.errors.userName : undefined;
export const phoneHelperText = (formik: any) => isPhoneErrorExist(formik) ? formik.errors.phone : undefined;
export const emailHelperText = (formik: any) => isEmailErrorExist(formik) ? formik.errors.email : undefined;
export const userGroupHelperText = (formik: any) => isUserGroupErrorExist(formik) ? formik?.errors?.userGroup?.value : undefined;
export const dspHelperText = (formik: any) => isDSPErrorExist(formik) ? formik?.errors?.dsp?.value : undefined;
