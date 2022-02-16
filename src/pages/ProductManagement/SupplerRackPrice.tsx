import React, { useState } from 'react';
import { Button } from '../../components/UIComponents/Button/Button.component';
import { Dialog, DialogContent, DialogActions, Grid, Typography } from '@mui/material';
import GridComponent from '../../components/UIComponents/DataGird/grid.component';
import ProductModel from "../../models/LotProductModel";
import { useGetSupplierPrices } from './queries';

type props = {
    isDisabled: boolean,
    formik: any,
    setSupplierPrice: (value: any) => any
}

interface GeneralOptions {
    label: string
    value: string
}


export default function SupplierRack({ isDisabled, formik, setSupplierPrice }: props) {

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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

    return (
        <React.Fragment>
            <h4 className='checkbox-heading price-heading'> SUPPLIER PRICE * (Fill all the Mandatory fields to select the price from the filtered list) </h4>
            <Button variant="outlined" onClick={handleClickOpen} className='supplier-modal-btn' disabled={!(formik.values.city && formik.values.supplier?.length && formik.values.branded?.length && formik.values.actualProduct?.length) || isDisabled}>
                {selectedRows.length === 0 ? "Choose the supplier price" : `Supplier price $${formik.values.supplierPrice}`}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="supplier-rack-dialog"
                className='supplierRack'
            >
                <div className="supplierRack-dialog-container">
                    <Typography color="var(--Darkgray)" variant="h2" component="h2" className="fw-bold" id="supplier-rack-dialog-title" pl={4.5} pt={2.5} >
                        {"Choose Supplier Price from the list"}
                    </Typography>
                    <DialogContent className="supplierRack-content">
                        <Grid container>
                            <Grid item xs={12} md={12} pb={5}>
                                <GridComponent
                                    handleSelect={onRowActionSelect}
                                    primaryKey='productKey'
                                    rows={supplierData?.data?.supplierPrices || []}
                                    header={headCells}
                                    isLoading={false}
                                    //openDrawer={openDrawer}
                                    enableRowSelection
                                    singleRowSelection
                                    getPages={false}
                                    searchTerm={''}
                                    noDataMsg='Prices are not available. Please contact the support team.'
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions className="supplierRack-dialog-actions">
                        <Button types="cancel" aria-label="cancel" className="mr-4" onClick={handleClose}>
                            {'Cancel'}
                        </Button>
                        <Button types="cancel" aria-label="cancel" className="mr-4" onClick={handleDone} disabled={selectedRows.length === 0}>
                            {'Done'}
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </React.Fragment>
    );
}
