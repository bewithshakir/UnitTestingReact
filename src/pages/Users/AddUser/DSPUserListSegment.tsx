import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { userGroupStr } from '../config';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import { dspHelperText, isDSPErrorExist } from "./validation";

type props = {
    formik: any,
    dspList: any;
}

export default function DSPUserListSegment ({ formik, dspList }: props) {

    const { t } = useTranslation();
    return (formik.values?.userGroup?.label?.toLowerCase() === userGroupStr.toLowerCase()) ?
        (
            <Grid item xs={12} md={12}>
                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                    <Select
                        id='dsp'
                        name='dsp'
                        label={t("addUser.form.dsp")}
                        placeholder='Choose'
                        value={formik.values.dsp}
                        items={dspList}
                        helperText={dspHelperText(formik)}
                        error={isDSPErrorExist(formik)}
                        onChange={formik.setFieldValue}
                        onBlur={() => {
                            formik.setFieldTouched("dsp");
                            formik.validateField("dsp");
                        }}
                        noOptionsMessage={() => "No data available Please create/add the DSP first to create/add a user"}
                        required
                    />
                </Grid>
            </Grid>
        ) : null;
}