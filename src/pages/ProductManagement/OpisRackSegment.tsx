import React, { Fragment, useState, useEffect } from 'react';
import Input from '../../components/UIComponents/Input/Input';
import Checkbox from '../../components/UIComponents/Checkbox/Checkbox.component';
import { FormControlLabel, Grid, Typography, FormControl, FormGroup } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { totalPricePerGallon } from '../../utils/math.utils';
import { OPISRackFormFields } from './config';
import OpisRackCity from './OpisRackCity';


type props = {
    isDisabled: boolean,
    formik: any,
    editMode: boolean,
    OPISRackFormFieldsInit: OPISRackFormFields
}

// fuelTaxExemptions
export default function OpisRackSegment({ isDisabled, formik, editMode, OPISRackFormFieldsInit }: props) {

    const { t } = useTranslation();

    useEffect(() => {
        console.warn(isDisabled);
        console.warn(formik);
        console.warn(t, useState);
    }, []);



    return (
        <Fragment>
            <OpisRackCity formik={formik} isDisabled={isDisabled} editMode={editMode} />
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <Input
                    id='manualPriceAmt'
                    label={t("addProductFormLabels.pricelabel")}
                    type='text'
                    helperText={(formik.touched.manualPriceAmt && formik.errors.manualPriceAmt) ? formik.errors.manualPriceAmt : undefined}
                    error={(formik.touched.manualPriceAmt && formik.errors.manualPriceAmt) ? true : false}
                    description=''
                    required
                    {...formik.getFieldProps('manualPriceAmt')}
                    disabled={isDisabled}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <Input
                    id='addedPriceAmt'
                    label={t("addProductFormLabels.adderlabel")}
                    type='text'
                    helperText={(formik.touched.addedPriceAmt && formik.errors.addedPriceAmt) ? formik.errors.addedPriceAmt : undefined}
                    error={(formik.touched.addedPriceAmt && formik.errors.addedPriceAmt) ? true : false}
                    description=''
                    {...formik.getFieldProps('addedPriceAmt')}
                    disabled={isDisabled}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <Input
                    id='discountPriceAmt'
                    label={t("addProductFormLabels.discountlabel")}
                    type='text'
                    helperText={(formik.touched.discountPriceAmt && formik.errors.discountPriceAmt) ? formik.errors.discountPriceAmt : undefined}
                    error={(formik.touched.discountPriceAmt && formik.errors.discountPriceAmt) ? true : false}
                    description=''
                    {...formik.getFieldProps('discountPriceAmt')}
                    disabled={isDisabled}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <FormControl sx={{ m: 3 }}>
                    <FormGroup>
                        {OPISRackFormFieldsInit?.fuelTaxExemptions.map((exemptionObj, index) => (
                            <React.Fragment key={index}>
                                <FormControlLabel
                                    sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                    className="checkbox-field"
                                    control={
                                        <Checkbox checked={exemptionObj.value} onChange={formik.handleChange} name={`${exemptionObj.label}`} disabled={isDisabled} />
                                    }
                                    label={
                                        <Typography color={isDisabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" className="fw-bold">
                                            {exemptionObj.label}
                                        </Typography>
                                    }
                                />
                            </React.Fragment>
                        ))}

                        {/* {formik.values.fuelTaxExemptions?.map((exemptionObj:any, index: number)=>(
                        <React.Fragment key={index}>
                            <FormControlLabel
                            sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                            className="checkbox-field"
                            control={
                                <Checkbox checked={exemptionObj[index].value} onChange={formik.handleChange} name={`${exemptionObj.label}`} disabled={isDisabled} />
                            }
                            label={
                                <Typography color={isDisabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" className="fw-bold">
                                    {exemptionObj.label}
                                </Typography>
                            }
                    />
                    </React.Fragment>
                    ))}      */}
                    </FormGroup>
                </FormControl>
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <Input
                    id='totalPrice'
                    label={'TOTAL PRICE PER GALLON (INCLUDING TAX)'}
                    type='text'
                    description=''
                    value={totalPricePerGallon(formik.values.manualPriceAmt, formik.values.addedPriceAmt, formik.values.discountPriceAmt, 4)}
                    disabled={true}
                />
            </Grid>
        </Fragment>
    );
}