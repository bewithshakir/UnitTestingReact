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
            <Box display="flex" mt={8} ml={0} className='product-management'>
                <Grid container direction="row">
                    <Grid item md={4} sm={12} xs={12}>
                      <ProductList/>
                    </Grid>
                    <Grid item md={8} sm={12} xs={12} pl={10}>
                        <AddProduct />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}