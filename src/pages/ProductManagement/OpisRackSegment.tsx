import React, { Fragment, useState, useEffect } from 'react';
import Input from '../../components/UIComponents/Input/Input';
import Checkbox from '../../components/UIComponents/Checkbox/Checkbox.component';
import Select from '../../components/UIComponents/Select/SingleSelect';
import MultiSelect from '../../components/UIComponents/Select/MultiSelect';
// import { Button } from '../../components/UIComponents/Button/Button.component';
import { FormControlLabel, Grid, Typography, FormControl, FormGroup } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { totalPricePerGallon } from '../../utils/math.utils';
import {  OPISRackFormFields } from './config';


type props = {
    isDisabled: boolean,
    formik: any,
    editMode: boolean,
    OPISRackFormFieldsInit: OPISRackFormFields
}

// fuelTaxExemptions
export default function OpisRackSegment({ isDisabled, formik, editMode, OPISRackFormFieldsInit }: props) {

    const { t } = useTranslation();
    const [cities, setCities] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [brandedList, setbrandedList] = useState([]);
    const [actualProductList, setActualProductList] = useState([]);

    useEffect(() => {
        console.warn(isDisabled);
        console.warn(formik);
        console.warn(t, useState);
        console.warn(setCities);
        console.warn(setSuppliers);
        console.warn(setbrandedList);
        console.warn(setActualProductList);
    }, []);

    const handleCityChange = (field: any, value: any) => {
        console.warn(field, value);
    };

    return (
        <Fragment>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <Select
                    id='city'
                    name='city'
                    label={'City'}
                    value={formik.values.city}
                    placeholder='Select one'
                    items={cities}
                    helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city.value : undefined}
                    error={(formik.touched.city && formik.errors.city) ? true : false}
                    onChange={handleCityChange}
                    onBlur={() => { formik.setFieldTouched("city"); formik.validateField("city"); }}
                    required
                    isDisabled={isDisabled || editMode}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <Input
                    id='state'
                    name='state'
                    label={'State'}
                    type='text'
                    onClick={(e) => e.preventDefault()}
                    helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state : undefined}
                    error={(formik.touched.state && formik.errors.state) ? true : false}
                    description=''
                    {...formik.getFieldProps('state')}
                    disabled
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <Input
                    id='cityId'
                    label={'City Id'}
                    type='text'
                    helperText={(formik.touched.cityId && formik.errors.cityId) ? formik.errors.cityId : undefined}
                    error={(formik.touched.cityId && formik.errors.cityId) ? true : false}
                    description=''
                    {...formik.getFieldProps('cityId')}
                    disabled
                />
            </Grid>

            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <MultiSelect
                    id={'supplier'}
                    label='Supplier'
                    placeholder='Choose Suppliers'
                    required
                    items={suppliers}
                    name={'supplier'}
                    value={formik.values.supplier}
                    disabled={isDisabled}
                    onChange={formik.setFieldValue}
                    onBlur={() => { formik.setFieldTouched('supplier'); formik.validateField('supplier'); }}
                    helperText={(formik.touched.supplier && formik.errors.supplier) ? JSON.parse(JSON.stringify(formik.errors.supplier)) : undefined}
                    error={(formik.touched.supplier && formik.errors.supplier) ? true : false}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <MultiSelect
                    id={'branded'}
                    label='Branded'
                    placeholder='Choose Branded'
                    required
                    items={brandedList}
                    name={'branded'}
                    value={formik.values.branded}
                    disabled={isDisabled}
                    onChange={formik.setFieldValue}
                    onBlur={() => { formik.setFieldTouched('branded'); formik.validateField('branded'); }}
                    helperText={(formik.touched.branded && formik.errors.branded) ? JSON.parse(JSON.stringify(formik.errors.branded)) : undefined}
                    error={(formik.touched.branded && formik.errors.branded) ? true : false}
                />
            </Grid>

            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <MultiSelect
                    id={'actualProduct'}
                    label='Actual Product'
                    placeholder='Choose Actual Product'
                    required
                    items={actualProductList}
                    name={'actualProduct'}
                    value={formik.values.actualProduct}
                    disabled={isDisabled}
                    onChange={formik.setFieldValue}
                    onBlur={() => { formik.setFieldTouched('actualProduct'); formik.validateField('actualProduct'); }}
                    helperText={(formik.touched.suppactualProductlier && formik.errors.actualProduct) ? JSON.parse(JSON.stringify(formik.errors.actualProduct)) : undefined}
                    error={(formik.touched.actualProduct && formik.errors.actualProduct) ? true : false}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <Input
                    id='supplierPrice'
                    name='supplierPrice'
                    label={'SUPPLIER PRICE * (Fill all the Mandatory fields to select the price from the filtered list)'}
                    type='text'
                    onClick={(e) => e.preventDefault()}
                    description=''
                    {...formik.getFieldProps('state')}
                    disabled={isDisabled}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <Input
                    id='opisName'
                    name='opisName'
                    label={'OPIS Name'}
                    type='text'
                    onClick={(e) => e.preventDefault()}
                    helperText={(formik.touched.opisName && formik.errors.opisName) ? formik.errors.opisName : undefined}
                    error={(formik.touched.opisName && formik.errors.opisName) ? true : false}
                    description=''
                    {...formik.getFieldProps('opisName')}
                    disabled
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                <Input
                    id='productNm'
                    label={t("addProductFormLabels.productnamelabel")}
                    type='text'
                    placeholder='Enter Product Name'
                    helperText={(formik.touched.productNm && formik.errors.productNm) ? formik.errors.productNm : undefined}
                    error={(formik.touched.productNm && formik.errors.productNm) ? true : false}
                    description=''
                    required
                    {...formik.getFieldProps('productNm')}
                    disabled={isDisabled}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                <hr></hr>
            </Grid>
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
                    {OPISRackFormFieldsInit?.fuelTaxExemptions.map((exemptionObj, index)=>(
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