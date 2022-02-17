import { Fragment, useState } from 'react';
import Input from '../../components/UIComponents/Input/Input';
import { Grid, FormControl } from "@mui/material";
import { useTranslation } from 'react-i18next';
import OpisRackCity from './OpisRackCity';
import CheckboxSegment from './CheckboxSegement';
import {calculateProductTotalPriceWithTaxes} from  '../../utils/helperFunctions';



type props = {
    isDisabled: boolean,
    formik: any,
    editMode: boolean,
    fetchTaxList: boolean,
    showFuelTaxError: (...args: any[]) => void;
    setFetchTaxList: (...args: any[]) => void;
    setSupplierPrice: (value: any) => any;
}

export default function OpisRackSegment({ isDisabled, formik, editMode, showFuelTaxError, fetchTaxList, setFetchTaxList, setSupplierPrice }: props) {
    
    const { t } = useTranslation();

    const [finalRateValue, updateFinalRateValue] = useState<any>(0);
    const [finalCPGValue, updateFinalCPGValue] = useState<any>(0);


    const calculateFinalPrice = (finalRate: number, finalCPGAmount: number) => {
        updateFinalRateValue(finalRate);
        updateFinalCPGValue(finalCPGAmount);
    };

    return (
        <Fragment>
            <OpisRackCity formik={formik} isDisabled={isDisabled} editMode={editMode} setSupplierPrice={setSupplierPrice} />
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            {/* Inside OpisRackSegment finalRate{finalRateValue}  finalCPG{finalCPGValue} */}
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
                <FormControl className='checkboxlist-wrapper' sx={{ m: 3 }}>
                    <CheckboxSegment formik={formik} isDisabled={isDisabled} showFuelTaxError={showFuelTaxError} fetchTaxList={fetchTaxList} setFetchTaxList={setFetchTaxList} revertFinalRateAndAmount={calculateFinalPrice} />
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
                    value={calculateProductTotalPriceWithTaxes(formik.values.manualPriceAmt, formik.values.addedPriceAmt, formik.values.discountPriceAmt, finalRateValue,finalCPGValue )}
                    disabled={true}
                />
            </Grid>
        </Fragment>
    );
}