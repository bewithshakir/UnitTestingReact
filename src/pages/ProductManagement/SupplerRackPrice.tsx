import { useState } from 'react';
import { Button } from '../../components/UIComponents/Button/Button.component';
import { Dialog, DialogContent, DialogActions, Grid, Typography } from '@mui/material';
import GridComponent from '../../components/UIComponents/DataGird/grid.component';
import ProductModel from "../../models/LotProductModel";

export default function SupplierRack() {
    const [open, setOpen] = useState(false);
    const ProductObj = new ProductModel();
    const headCells = ProductObj.fieldsToDisplaySupplierRack();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
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
                                    rows={[]}
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
        </div>
    );
}
