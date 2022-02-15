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
        // debugger; // eslint-disable-line no-debugger
        console.warn('error', err);
        showFuelTaxError(true);
        setFetchTaxList(false);
    };

    const onTaxExsSuccess = (data: any) => {
        console.warn('success', data);
        if(data && data.data && data.data.length>0){
            showFuelTaxError(false);
            setFetchTaxList(false);
            data.data.map((checkBoxObj: any) => (
                formik.setFieldValue(`${checkBoxObj.taxRateId}`, false)
            ));
        }

    };

    const { data: fuelTaxExemptionsList } = useGetTaxRates(fetchTaxList, formik?.values?.productType?.value, parkingLotCityNm, onTaxExsSuccess, onTaxExsError);

    const selectAllCheckboxes = (val: boolean) => {
        if(val){
            const arr:Array<any> = [];
            taxExemptionList.forEach((checkBoxObj: any) => {
                formik.setFieldValue(`${checkBoxObj.taxRateId}`, val);
                arr.push(checkBoxObj.taxRateId);
            });
            formik.setFieldValue('taxExemption', arr);
        }else{
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
        console.warn('e.target.name', e.target.name);
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
        // console.warn('test-->', updateTaxExemptionList, capitalizeFirstLetter);
        if (formik.values.taxExemption.length > 0 && formik.values.taxExemption.length === taxExemptionList.length) {
            setSelectAll(true);
        }
        // console.warn("check***********-->",fuelTaxExemptionsList);
        if(fuelTaxExemptionsList && fuelTaxExemptionsList.data){
            updateTaxExemptionList(fuelTaxExemptionsList.data.map((obj: any) => ({ ...obj, label: capitalizeFirstLetter(obj.taxRateTypeNm.replace(/-/g, ' ')), value:false  })));
        }
    }, [formik.values, fuelTaxExemptionsList]);


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

