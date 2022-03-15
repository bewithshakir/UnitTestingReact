const setHelperTextByFieldType = (formik: any, name: string, fieldType: string) => {
    if (fieldType === 'select') {
        return (formik.errors as any)[name]?.value;
    }
    if (fieldType === 'input') {
        return (formik.errors as any)[name];
    }
    if (fieldType === 'multiselect') {
        return JSON.parse(JSON.stringify(formik.errors[name])) ;
    }
    return undefined;
};

export const getFormFieldHelperText = (formik: any, name: string, fieldType: string) => {
    if ((formik.touched as any)[name] && (formik.errors as any)[name]) {
        return setHelperTextByFieldType(formik, name, fieldType);
    }
    return undefined;
};

export const getFormFieldError = (formik: any, name: string) => {
    if ((formik.touched as any)[name] && (formik.errors as any)[name]) {
        return true;
    }
    return false;
};