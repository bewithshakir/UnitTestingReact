import React, { useState, useEffect } from 'react';
import Checkbox from '../../components/UIComponents/Checkbox/Checkbox.component';
import { FormControlLabel, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { checkboxConfig } from './config';
import { useGetTaxRates } from './queries';
import { useAddedParkingLotCityNmStore } from '../../store';
import { calculateTaxesMaster, updateTaxOnCheckBoxChange } from './utils';



type props = {
    isDisabled: boolean,
    formik: any,
    showFuelTaxError: (...args: any[]) => void,
    fetchTaxList: boolean,
    setFetchTaxList: (...args: any[]) => void;
    revertFinalRateAndAmount: (...args: any[]) => any;
    isSaveCancelShown: boolean;
}


export default function CheckBoxSegment({ isDisabled, formik, showFuelTaxError, fetchTaxList, setFetchTaxList, revertFinalRateAndAmount, isSaveCancelShown }: props) {

    const { t } = useTranslation();

    const [selectAll, setSelectAll] = useState(false);
    const [taxExemptionList, updateTaxExemptionList] = useState<Array<any>>([]);
    const parkingLotCityNm = useAddedParkingLotCityNmStore((state) => state.parkingLotCityNm);
    const [totalRate, updateTotalRate] = useState<number>(0);
    const [totalCPG, updateTotalCPG] = useState<number>(0);

    const [finalRate, updateFinalRate] = useState<number>(0);
    const [finalCPG, updateFinalCPG] = useState<number>(0);

    const onTaxExsError = (err: any) => {
        const { data: { error } } = err.response;
        if (error?.httpCode === 404) {
            showFuelTaxError(true);
        }
    };

    const onTaxExsSuccess = (data: any) => {

        if (!data?.data?.length) {
            return;
        }
        showFuelTaxError(false);
        setFetchTaxList(false);
        const { arr, totalRateCalc, totalCPGCalc, rateCalcModified, CPGCalcModified, checkAllBoxes } = calculateTaxesMaster(data.data, formik, isSaveCancelShown, isDisabled);
        if(checkAllBoxes){
            setSelectAll(true);
        }
        updateTotalRate(totalRateCalc);
        updateTotalCPG(totalCPGCalc);
        updateFinalRate(rateCalcModified);
        updateFinalCPG(CPGCalcModified);
        updateTaxExemptionList(arr);
    };

    useGetTaxRates(fetchTaxList, formik?.values?.masterProductName?.value, parkingLotCityNm, onTaxExsSuccess, onTaxExsError);

    const selectAllCheckboxes = (val: boolean) => {
        const arr: Array<any> = [];
        if (val) {
            taxExemptionList.forEach((checkBoxObj: any) => {
                formik.setFieldValue(`${checkBoxObj.taxRateId}`, val);
                arr.push(checkBoxObj.taxRateId);
            });
            formik.setFieldValue('taxExemption', arr);
            updateFinalRate(0);
            updateFinalCPG(0);
        } else {
            taxExemptionList.forEach((checkBoxObj: any) => {
                formik.setFieldValue(`${checkBoxObj.taxRateId}`, val);
            });
            formik.setFieldValue(`taxExemption`, []);
            updateFinalRate(totalRate);
            updateFinalCPG(totalCPG);
        }

    };

    const handleSelectAll = (e: any) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        selectAllCheckboxes(checked);
    };

    const onCheckBoxChange = (index: number, e: any) => {
        const checked = e.target.checked;
        const name = e.target.name;
        formik.setFieldValue(name, e.target.checked);
        const moneyIndicator = taxExemptionList[index]?.moneyPctIndicator?.toLowerCase();
        updateTaxOnCheckBoxChange({selectAll, formik, moneyIndicator,taxExemptionList, index, checked, name, finalRate, finalCPG, updateFinalRate,  updateFinalCPG,setSelectAll });
    };

    useEffect(() => {
        if (formik.values.taxExemption.length > 0 && formik.values.taxExemption.length === taxExemptionList.length) {
            setSelectAll(true);
        }
    }, [formik.values.taxExemption]);

    useEffect(() => {
        revertFinalRateAndAmount(finalRate, finalCPG);
    }, [finalRate, finalCPG]);

    return (

        <React.Fragment>
            <h4 className='checkbox-heading'> {t("addProductFormLabels.addproductcheckboxseg")} </h4>
            {taxExemptionList.length > 0 && <React.Fragment>
                <FormControlLabel
                    sx={checkboxConfig}
                    className="checkbox-field"
                    disabled={isDisabled}
                    control={<Checkbox checked={selectAll} name="selectAll" onChange={handleSelectAll} disabled={isDisabled} />}
                    label={<Typography color={isDisabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" >
                        {t("addProductFormLabels.addproductselectall")}
                    </Typography>} />

                {taxExemptionList.map((checkBoxObj: any, index: number) => (
                    <FormControlLabel
                        sx={checkboxConfig}
                        key={checkBoxObj.taxRateId}
                        disabled={isDisabled}
                        className="checkbox-field"
                        control={<Checkbox checked={formik.values[checkBoxObj.taxRateId]} name={`${checkBoxObj.taxRateId}`} onChange={(e: any) => onCheckBoxChange(index, e)} disabled={isDisabled} />}
                        label={<Typography color={isDisabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" >
                            {checkBoxObj.label}
                        </Typography>} />
                ))}
            </React.Fragment>}
        </React.Fragment>
    );
}
