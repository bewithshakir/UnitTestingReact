import { capitalizeFirstLetter } from '../../utils/helperFunctions';
import Decimal from 'decimal.js';

interface calcBaseObjType {
    [indicator: string]:{ 
        updateFunc?: any;
        taxRateFactorChecked?:number;
        taxRateFactorNotChecked?:number;
    }    
   
}

const setHelperTextByFieldType = (formik: any, name: string, fieldType: string) => {
    if (fieldType === 'select') {
        return (formik.errors as any)[name]?.value;
    }
    if (fieldType === 'input') {
        return (formik.errors as any)[name];
    }
    if (fieldType === 'multiselect') {
        return JSON.parse(JSON.stringify(formik.errors[name])) ;
    }
    return undefined;
};

export const getFormFieldHelperText = (formik: any, name: string, fieldType: string) => {
    if ((formik.touched as any)[name] && (formik.errors as any)[name]) {
        return setHelperTextByFieldType(formik, name, fieldType);
    }
    return undefined;
};

export const getFormFieldError = (formik: any, name: string) => {
    if ((formik.touched as any)[name] && (formik.errors as any)[name]) {
        return true;
    }
    return false;
};


const includeExemptionsFromGetProductDetails = (formik: any, arr: Array<any>, rateCalcModified: number, CPGCalcModified: number) => {
    let rcm = rateCalcModified;
    let cpgcm = CPGCalcModified;
    const taxArrEditProduct = arr.filter((obj: any) => formik?.values?.taxExemption.some((exStr: any) => obj.taxRateId === exStr));
    taxArrEditProduct.forEach((obj: any) => {
        formik.setFieldValue(`${obj.taxRateId}`, true);
        let rQ = 0;
        let cQ = 0;

        if (obj?.moneyPctIndicator?.toLowerCase() === 'p') {
            rQ = Number((new Decimal(Number(obj.taxRateAmt))).dividedBy(100));
            rcm = Number((new Decimal(rcm)).minus(Number(rQ)));
        } else if (obj?.moneyPctIndicator?.toLowerCase() === 'm') {
            cQ = Number(obj.taxRateAmt);
            cpgcm = Number((new Decimal(cpgcm)).minus(Number(cQ)));
        }
    });
    return { rateCalcModified: rcm, CPGCalcModified: cpgcm, checkAllBoxes: taxArrEditProduct?.length === arr?.length };
};

export const calculateTaxesMaster = (taxListAPIData: any, formik: any,isSaveCancelShown: boolean, isDisabled: boolean ) => {
    const arr: Array<any> = [];
    let ppdTaxAm = 0;
    let ppdTaxId = '';
    let totalRateCalc = 0;
    let totalCPGCalc = 0;
    let checkAllBoxes = false;
    taxListAPIData.forEach((checkBoxObj: any) => {
        const exmptnListObj = { ...checkBoxObj, label: capitalizeFirstLetter(checkBoxObj.taxRateTypeNm.replace(/-/g, ' ')), value: false };
        arr.push(exmptnListObj);
        formik.setFieldValue(`${checkBoxObj.taxRateId}`, false);
        if (checkBoxObj?.moneyPctIndicator?.toLowerCase() === 'p') {

            const rateQ = Number((new Decimal(Number(checkBoxObj.taxRateAmt))).dividedBy(100));
            const totalVal = new Decimal(Number(totalRateCalc));
            totalRateCalc = Number(totalVal.plus(rateQ));
        } 
        if (checkBoxObj?.moneyPctIndicator?.toLowerCase() === 'm') {
            const cpgQ = Number(checkBoxObj.taxRateAmt);
            const totalVal = new Decimal(Number(totalCPGCalc));
            totalCPGCalc = Number(totalVal.plus(cpgQ));
        }
        if (isSaveCancelShown && checkBoxObj.taxRateTypeNm?.toLowerCase() === "ppd-sales-tax") {
            ppdTaxAm = checkBoxObj.taxRateAmt;
            ppdTaxId = checkBoxObj.taxRateId;
        }

    });
    let CPGCalcModified = totalCPGCalc;
    let rateCalcModified = totalRateCalc;

    if (isSaveCancelShown && ppdTaxId) {
        formik.setFieldValue(`${ppdTaxId}`, true);
        formik.setFieldValue('taxExemption', [ppdTaxId]);
        CPGCalcModified = Number((new Decimal(totalCPGCalc)).minus(Number(ppdTaxAm)));
    }

    if (!isSaveCancelShown && isDisabled && formik?.values?.taxExemption && formik?.values?.taxExemption.length > 0) {
        const exmptionsObjModified = includeExemptionsFromGetProductDetails(formik, arr, rateCalcModified, CPGCalcModified);
        rateCalcModified = exmptionsObjModified.rateCalcModified;
        CPGCalcModified = exmptionsObjModified.CPGCalcModified;
        checkAllBoxes = exmptionsObjModified.checkAllBoxes;

    }
    return {arr, totalRateCalc, totalCPGCalc,  rateCalcModified , CPGCalcModified, checkAllBoxes};
};



interface checkBoxTaxCalcObjType{
    selectAll:boolean;
    formik:any;
    moneyIndicator: string;
    taxExemptionList: any;
    index: number; 
    checked: boolean;
    name: string;
    finalRate: number;
     finalCPG: number; 
     updateFinalRate:any;  
     updateFinalCPG:any;
     setSelectAll:any;
}

export const updateTaxOnCheckBoxChange = ({
    selectAll, 
    formik,
    moneyIndicator,
    taxExemptionList, 
    index, 
    checked, 
    name, 
    finalRate, 
    finalCPG, 
    updateFinalRate,  
    updateFinalCPG,
    setSelectAll } : checkBoxTaxCalcObjType) => {
    
    const taxExObj = taxExemptionList[index];
    const finalRateDec = new Decimal(Number(finalRate));
    const finalCPGDec = new Decimal(Number(finalCPG));
    const taxRateAmt = new Decimal(Number(taxExObj.taxRateAmt));
    const taxRateQ = Number(taxRateAmt.dividedBy(100));
    const cpgQ = Number(taxExObj.taxRateAmt);

    const calcBaseObj: calcBaseObjType= {
        'p':{
            taxRateFactorChecked: Number(finalRateDec.minus(taxRateQ)),
            taxRateFactorNotChecked: Number(finalRateDec.plus(taxRateQ)),
            updateFunc: updateFinalRate
        },
        'm':{
            taxRateFactorChecked: Number(finalCPGDec.minus(cpgQ)),
            taxRateFactorNotChecked: Number(finalCPGDec.plus(cpgQ)),
            updateFunc: updateFinalCPG
        }
    }; 
    const deciderObj = calcBaseObj[moneyIndicator];
    if(checked){
        formik.setFieldValue('taxExemption', [...formik.values.taxExemption, name]);
        deciderObj.updateFunc(deciderObj.taxRateFactorChecked);
        return;
    }
    if (selectAll) {
        setSelectAll(false);
    }
    deciderObj.updateFunc(deciderObj.taxRateFactorNotChecked);
    formik.setFieldValue('taxExemption', formik.values.taxExemption.filter((item: any) => item !== name));

};