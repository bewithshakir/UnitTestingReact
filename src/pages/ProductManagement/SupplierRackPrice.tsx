import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/UIComponents/Button/Button.component';
import { Dialog, DialogContent, DialogActions, Grid, Typography, IconButton } from '@mui/material';
import GridComponent from '../../components/UIComponents/DataGird/grid.component';
import ProductModel from "../../models/LotProductModel";
import { useGetSupplierPrices } from './queries';
import { CloseIcon } from '../../assets/icons';
import { formatSupplierPriceData } from './config';
import { useTranslation } from 'react-i18next';
import { truncateDecimals } from '../../utils/math.utils';

type props = {
    isDisabled: boolean,
    formik: any,
    setSupplierPrice: (value: any) => any
    resetSupplierValue?: any,
    isSaveCancelShown: boolean
}

interface GeneralOptions {
    label: string
    value: string
}


export default function SupplierRack({ isDisabled, formik, setSupplierPrice, resetSupplierValue, isSaveCancelShown }: props) {

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const ProductObj = new ProductModel();
    const headCells = ProductObj.fieldsToDisplaySupplierRack();
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const { data: supplierData } = useGetSupplierPrices({
        cityId: formik.values?.city?.cityId,
        supplier: formik.values?.supplier.map((s: GeneralOptions) => s.value),
        brandIndicator: formik.values?.branded.map((v: GeneralOptions) => v.value),
        actualProduct: formik.values?.actualProduct.map((a: GeneralOptions) => a.value),
    });
    const resetSupplierSelection = useCallback(() => {
        setSupplierPrice(null);
        formik.setFieldValue('supplierPrice', 0);
        formik.setFieldValue('manualPriceAmt', 0);
        formik.setFieldValue('opisName', '');
        setSelectedRows([]);
    }, [formik]);

    useEffect(() => {
        if(isSaveCancelShown){
            resetSupplierSelection();
        }
        
    }, [resetSupplierValue]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const clearPriceOnBtn = () => {
        if (formik.values.opisName) {
            resetSupplierSelection();
        }
    };

    const handleClose = (event?: any, reason?: any) => {
        if (reason && reason == "backdropClick") {
            return;
        }
        setOpen(false);
    };

    const handleDone = () => {
        const supplierPrice = supplierData?.data?.supplierPrices.find(sd => (sd.productKey === selectedRows[0]));
        if (supplierPrice) {
            /** convert gross price from cent to dollar and assign */
            formik.setFieldValue('supplierPrice', truncateDecimals((supplierPrice.grossPrice * .01), 4));
            formik.setFieldValue('manualPriceAmt', truncateDecimals((supplierPrice.grossPrice * .01), 4));
            formik.setFieldValue('opisName', supplierPrice.opisProductName);
            setSupplierPrice(supplierPrice);
        } else {
            setSupplierPrice(null);
        }
        setOpen(false);
    };

    const onRowActionSelect = (selectedIds: string[]) => {
        setSelectedRows(selectedIds);
    };

    return (
        <React.Fragment>
            <h4 className='checkbox-heading price-heading'> {t("addProductFormLabels.supplierrackheading")} </h4>
            <Button variant="outlined" className={'supplier-modal-btn '+ (!isSaveCancelShown && isDisabled ? 'modal-btn-viewmode':'')}  disabled={!(formik.values.city && formik.values.supplier?.length && formik.values.branded?.length && formik.values.actualProduct?.length) || isDisabled} >
                <div className='price-div' onClick={handleClickOpen}> {formik.values.opisName ? `Supplier price $${formik.values.supplierPrice}` : "Choose the supplier price"} </div> {formik.values.opisName && isSaveCancelShown && <div className='clear-price-cross' onClick={clearPriceOnBtn}><IconButton edge='start'  >
                    <CloseIcon /> </IconButton> </div>}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="supplier-rack-dialog"
                className='supplierRack'
                disableEscapeKeyDown
            >
                <div className="supplierRack-dialog-container">

                    <Grid container>
                        <Grid item xs={10} md={10}>
                            <Typography color="var(--Darkgray)" variant="h2" component="h2" className="fw-bold" id="supplier-rack-dialog-title" pl={4.5} pt={2.5} >
                                {t("addProductFormLabels.supplierpriceheading")}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={2} textAlign={'right'}>
                            <IconButton edge='start' onClick={handleClose}>
                                <CloseIcon
                                    className='info_panel_close_icon'
                                />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <DialogContent className="supplierRack-content">
                        <Grid container>
                            <Grid item xs={12} md={12} pb={5}>
                                <GridComponent
                                    handleSelect={onRowActionSelect}
                                    primaryKey='productKey'
                                    rows={formatSupplierPriceData(supplierData?.data?.supplierPrices || [])}
                                    header={headCells}
                                    isLoading={false}
                                    enableRowSelection
                                    singleRowSelection
                                    getPages={() => null}
                                    searchTerm={''}
                                    noDataMsg={t("addProductFormLabels.supplierpricenodatamsg")}
                                />
                            </Grid>
                        </Grid>
                        <DialogActions className="supplierRack-dialog-actions">
                            <Button types="cancel" aria-label="cancel" className="mr-4" onClick={handleClose}>
                                {'Cancel'}
                            </Button>
                            <Button
                                types="primary"
                                aria-label="primary" className="mr-4 supplierRackBtn" onClick={handleDone} disabled={selectedRows.length === 0}>
                                {'Done'}
                            </Button>
                        </DialogActions>
                    </DialogContent>

                </div>
            </Dialog>
        </React.Fragment >
    );
}
