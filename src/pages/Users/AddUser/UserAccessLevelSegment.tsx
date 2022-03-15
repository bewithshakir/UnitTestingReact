import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { userAccessLevelSX } from '../config';

type props = {
    formik: any,
    userPermissionList: any;
}

export default function UserAccessLevelSegment ({ formik, userPermissionList }: props) {

    const { t } = useTranslation();
    return userPermissionList ?
        (
            <Fragment>
                <Grid item md={12} mt={3} mb={2}>
                    <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold">
                        {t("addUser.form.userGroupAccessLevel.title")}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="user-access-permission"
                            defaultValue=""
                            id="userAccessLevel"
                            name="userAccessLevel"
                            value={formik.values.userAccessLevel}
                            onChange={formik.handleChange}
                        >
                            {userPermissionList?.map((perObj: any, index: any) => (
                                <FormControlLabel
                                    key={perObj.value}
                                    value={perObj.value}
                                    sx={{ ...userAccessLevelSX }}
                                    control={<Radio
                                        role="radio"
                                        id={`userAccessLevel-${index}`}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "var(--Gray)",
                                            },
                                        }}
                                        aria-label={perObj.label} />}
                                    label={
                                        <Typography color="var(--Darkgray)" variant="h4" pl={2.5} className="fw-bold">
                                            {perObj.label}
                                        </Typography>
                                    } />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Fragment>
        ) : null;
}