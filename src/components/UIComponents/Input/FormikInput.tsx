import { useField } from 'formik';

import Input, { InputProps } from "./Input";

export default function FormikInput(props: InputProps) {
    const [, meta] = useField(props as any);

    return <Input {...props}
        error={Boolean(meta.error && meta.touched)}
        helperText={meta.touched && meta.error ? meta.error : undefined}
    />;
}