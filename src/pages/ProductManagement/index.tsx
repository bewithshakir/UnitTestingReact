import { Fragment, useEffect, useState } from 'react';
import AddProduct from './AddProduct';
import { Box, Grid } from '@mui/material';
import "./ProductManagement.scss";
import ProductList from './ProductList';
import { useProductsByLotId } from './queries';

export default function ProductManagement() {
    const [productList, setProductList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    //const just for api testing....
    const lotId = 'ff126bdb-1d00-4eca-963c-28dc5b8e2e2e';

    const { data, fetchNextPage, isLoading, isFetching }: any = useProductsByLotId(lotId, searchTerm);

    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item.data.lotProducts);
            });
            setProductList(list);
        }
    }, [data]);

    return (
        <Fragment>
            <Box display="flex" className='product-management'>
                <Grid container direction="row">
                    <Grid item md={4} sm={12} xs={12}>
                      <ProductList 
                        searchTerm={searchTerm}
                        searchTermInputChange={onInputChange}
                        productData={productList}
                        isLoadingData={isLoading || isFetching}
                        loadNextPage={fetchNextPage}
                      />
                    </Grid>
                    <Grid item md={8} sm={12} xs={12} pl={4}>
                        <AddProduct />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}