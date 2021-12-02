import { Fragment } from 'react';
import AddProduct from './AddProduct';
import { Box } from '@mui/material';


// interface props {

// }

export default function ProductManagement() {

    return (
        <Fragment>
            <Box className="product-management-container">
            <AddProduct/>
            </Box>
        </Fragment>
    );
}