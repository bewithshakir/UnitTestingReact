import React, { useEffect, useState } from 'react';
import { Button } from '../../components/UIComponents/Button/Button.component';
import { Dialog, DialogContent, DialogActions, Grid, Typography } from '@mui/material';
import GridComponent from '../../components/UIComponents/DataGird/grid.component';
import ProductModel from "../../models/LotProductModel";
import { useGetSupplierPrices } from './queries';

type props = {
    isDisabled: boolean,
    formik: any,
}


export default function SupplierRack({ isDisabled, formik }: props) {

    const [open, setOpen] = useState(false);
    const ProductObj = new ProductModel();
    const headCells = ProductObj.fieldsToDisplaySupplierRack();
    const { data: supplierPrices } = useGetSupplierPrices({
        cityId: formik.values?.city?.cityId,
        supplier: formik.values?.supplier,
        brandIndicator: formik.values?.branded,
        actualProduct: formik.values?.actualProduct
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.warn(formik);
    };
    useEffect(() => {
        console.warn('supplierPrices', supplierPrices);
    }, [supplierPrices]);


    return (
        <React.Fragment>
            <h4 className='checkbox-heading price-heading'> SUPPLIER PRICE * (Fill all the Mandatory fields to select the price from the filtered list) </h4>
            <Button variant="outlined" onClick={handleClickOpen} className='supplier-modal-btn' disabled={!(formik.values.city && formik.values.supplier?.length && formik.values.branded?.length && formik.values.actualProduct?.length) || isDisabled}>
                {'Choose the supplier price'}
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
                                    //handleSelect={onRowActionSelect}
                                    primaryKey='applicableProductId'
                                    rows={supplierPrices?.data?.supplierPrices || []}
                                    header={headCells}
                                    isLoading={false}
                                    //openDrawer={openDrawer}
                                    enableRowSelection
                                    getPages={false}
                                    searchTerm={''}
                                    noDataMsg='Add Products to setup the fee details to complete the lot requirement.'
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions className="supplierRack-dialog-actions">
                        <Button types="cancel" aria-label="cancel" className="mr-4" onClick={handleClose}>
                            {'Cancel'}
                        </Button>
                        <Button types="cancel" aria-label="cancel" className="mr-4" onClick={handleClose}>
                            {'Done'}
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </React.Fragment>
    );
}
