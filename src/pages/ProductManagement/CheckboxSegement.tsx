import React, { useState, useEffect } from 'react';
import Checkbox from '../../components/UIComponents/Checkbox/Checkbox.component';
import {capitalizeFirstLetter} from '../../utils/helperFunctions';
import { FormControlLabel, Typography } from "@mui/material";
// import { useTranslation } from 'react-i18next';
import { checkboxConfig } from './config';
import { useGetTaxRates } from './queries';
import { useAddedParkingLotCityNmStore} from '../../store';


type props = {
    isDisabled: boolean,
    formik: any,
    showFuelTaxError:  (...args: any[]) => void,
    fetchTaxList: boolean,
    setFetchTaxList:  (...args: any[]) => void; 
}


export default function CheckBoxSegment({ isDisabled, formik, showFuelTaxError, fetchTaxList , setFetchTaxList}: props) {

    // const { t } = useTranslation();

    const [selectAll, setSelectAll] = useState(false);
    const [taxExemptionList, updateTaxExemptionList] = useState<Array<any>>([]);
    const parkingLotCityNm = useAddedParkingLotCityNmStore((state) => state.parkingLotCityNm);

    const onTaxExsError = (err: any) => {
        const { data: { error } } = err.response;
        if (error?.httpCode === 404) {
            showFuelTaxError(true);
        }
    };

    const onTaxExsSuccess = (data: any) => {
        if(data && data.data && data.data.length>0){
            const arr:Array<any> = [];
            showFuelTaxError(false);
            setFetchTaxList(false);
            data.data.forEach((checkBoxObj: any) => {
                const exmptnListObj = {...checkBoxObj, label: capitalizeFirstLetter(checkBoxObj.taxRateTypeNm.replace(/-/g, ' ')), value:false};
                arr.push(exmptnListObj);
                formik.setFieldValue(`${checkBoxObj.taxRateId}`, false);
            });
            updateTaxExemptionList(arr);
        }
    };

    useGetTaxRates(fetchTaxList, formik?.values?.masterProductName?.value, parkingLotCityNm, onTaxExsSuccess, onTaxExsError);

    const selectAllCheckboxes = (val: boolean) => {
        const arr:Array<any> = [];
        if(val){
            taxExemptionList.forEach((checkBoxObj: any) => {
                formik.setFieldValue(`${checkBoxObj.taxRateId}`, val);
                arr.push(checkBoxObj.taxRateId);
            });
            formik.setFieldValue('taxExemption', arr);
        }else{
            taxExemptionList.forEach((checkBoxObj: any) => {
                formik.setFieldValue(`${checkBoxObj.taxRateId}`, val);
            });
            formik.setFieldValue(`taxExemption`, []);
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
        if (checked) {
            formik.setFieldValue('taxExemption', [...formik.values.taxExemption, name]);
        } else {
            if (selectAll) {
                setSelectAll(false);
            }
            formik.setFieldValue('taxExemption', formik.values.taxExemption.filter((item:any) => item !== name));
        }
    };

    useEffect(() => {
        if (formik.values.taxExemption.length > 0 && formik.values.taxExemption.length === taxExemptionList.length) {
            setSelectAll(true);
        }
    }, [formik.values.taxExemption]);


    return (

        <React.Fragment>
            <h4 className='checkbox-heading'> Fuel Tax Exemptions ($) </h4>
           {taxExemptionList.length>0 && <React.Fragment>
            <FormControlLabel
                sx={checkboxConfig}
                className="checkbox-field"
                disabled={isDisabled}
                control={<Checkbox checked={selectAll} name="selectAll" onChange={handleSelectAll} disabled={isDisabled} />}
                label={<Typography color={isDisabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" >
                    Select All
                </Typography>} />

            { taxExemptionList.map((checkBoxObj: any, index: number) => (
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

