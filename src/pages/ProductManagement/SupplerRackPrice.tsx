import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/UIComponents/Button/Button.component';
import { Dialog, DialogContent, DialogActions, Grid, Typography, IconButton } from '@mui/material';
import GridComponent from '../../components/UIComponents/DataGird/grid.component';
import ProductModel from "../../models/LotProductModel";
import { useGetSupplierPrices } from './queries';
import { CloseIcon } from '../../assets/icons';
import { formatSupplierPriceData } from './config';
import { useTranslation } from 'react-i18next';

type props = {
    isDisabled: boolean,
    formik: any,
    setSupplierPrice: (value: any) => any
    resetSupplierValue?: any
}

interface GeneralOptions {
    label: string
    value: string
}


export default function SupplierRack({ isDisabled, formik, setSupplierPrice, resetSupplierValue }: props) {

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
        resetSupplierSelection();
    }, [resetSupplierValue]);

    const handleClickOpen = () => {
        if (formik.values.opisName) {
            resetSupplierSelection();
        } else {
            setOpen(true);
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
            formik.setFieldValue('supplierPrice', supplierPrice.grossPrice * .01);
            formik.setFieldValue('manualPriceAmt', supplierPrice.grossPrice * .01);
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
    const endIcon = formik.values.opisName ? {
        endIcon: <CloseIcon key={'dummyKey1'} className='info_panel_close_icon' color='var(--White)'
        />
    } : {};
    return (
        <React.Fragment>
            <h4 className='checkbox-heading price-heading'> {t("addProductFormLabels.supplierrackheading")} </h4>
            <Button variant="outlined" onClick={handleClickOpen} className='supplier-modal-btn' disabled={!(formik.values.city && formik.values.supplier?.length && formik.values.branded?.length && formik.values.actualProduct?.length) || isDisabled} {...endIcon} >
                {formik.values.opisName ? `Supplier price $${formik.values.supplierPrice}` : "Choose the supplier price"}
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
                    </DialogContent>
                    <DialogActions className="supplierRack-dialog-actions">
                        <Button types="cancel" aria-label="cancel" className="mr-4" onClick={handleClose}>
                            {'Cancel'}
                        </Button>
                        <Button
                            types="primary"
                            aria-label="primary" className="mr-4" onClick={handleDone} disabled={selectedRows.length === 0}>
                            {'Done'}
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </React.Fragment >
    );
}
