import React, { useState, useEffect } from 'react';
import Checkbox from '../../components/UIComponents/Checkbox/Checkbox.component';
import { FormControlLabel, Typography } from "@mui/material";
// import { useTranslation } from 'react-i18next';
import { checkboxConfig, checkBoxList } from './config';


type props = {
    isDisabled: boolean,
    formik: any
}


export default function CheckBoxSegment({ isDisabled, formik }: props) {

    // const { t } = useTranslation();

    const [selectAll, setSelectAll] = useState(false);
    const [selectedCBs, updateSelectedCBs] = useState<Array<string>>([]);

    const selectAllCheckboxes = (val: boolean) => {

        checkBoxList.map((checkBoxObj: any) => (
            formik.setFieldValue(`${checkBoxObj.field}`, val)
        ));

        formik.setFieldValue('fuelTaxExemptions[0].stateFuelTax', val);
    };

    const handleSelectAll = (e: any) => {
        setSelectAll(e.target.checked);
        selectAllCheckboxes(!selectAll);
    };

    const onCheckBoxChange = (index: number, e: any) => {
        const checked = e.target.checked;
        const name = e.target.name;
        console.warn('e.target.name', e.target.name);
        formik.setFieldValue(name, e.target.checked);
        if (checked) {
            updateSelectedCBs(selectedCBs => [...selectedCBs, name]);
        } else {
            if (selectAll) {
                setSelectAll(false);
            }
            updateSelectedCBs(selectedCBs.filter(item => item !== name));
        }

    };

    useEffect(() => {
        if (selectedCBs.length === checkBoxList.length) {
            setSelectAll(true);
        }
    }, [formik.values, selectedCBs]);


    return (

        <React.Fragment>
            <h4 className='checkbox-heading'> Fuel Tax Exemptions ($) </h4>
            <FormControlLabel
                sx={checkboxConfig}
                className="checkbox-field"
                disabled={isDisabled}
                control={<Checkbox checked={selectAll} name="selectAll" onChange={handleSelectAll} disabled={isDisabled} />}
                label={<Typography color={isDisabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" >
                    Select All
                </Typography>} />

            {checkBoxList.map((checkBoxObj: any, index: number) => (
                <FormControlLabel
                    sx={checkboxConfig}
                    key={checkBoxObj.field}
                    disabled={isDisabled}
                    className="checkbox-field"
                    control={<Checkbox checked={formik.values[checkBoxObj.field]} name={`${checkBoxObj.field}`} onChange={(e: any) => onCheckBoxChange(index, e)} disabled={isDisabled} />}
                    label={<Typography color={isDisabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" >
                        {checkBoxObj.label}
                    </Typography>} />
            ))}
        </React.Fragment>
    );
}

