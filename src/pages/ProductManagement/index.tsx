import { Fragment } from 'react';
import AddProduct from './AddProduct';
import { Box, Grid } from '@mui/material';
import "./ProductManagement.scss";
import ProductList from './ProductList';


// interface props {

// }

export default function ProductManagement() {
    return (
        <Fragment>
            <Box display="flex" mt={8} ml={8}>
                <Grid container direction="row">
                    <Grid item md={3} sm={12} xs={12}>
                      <ProductList/>
                    </Grid>
                    <Grid item md={9} sm={12} xs={12}>
                        <AddProduct />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}